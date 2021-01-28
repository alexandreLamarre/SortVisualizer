/**
BASE ON CODE FROM:
https://github.com/mapbox/delaunator

UNDER LICENSE:
ISC License

Copyright (c) 2017, Mapbox

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.
**/

const EPSILON = Math.pow(2, -52);
const EDGE_STACK = new Uint32Array(512);


/**
Return a delaunay triangulation of the 2D data

Pseudocode & explanation: https://en.wikipedia.org/wiki/Bowyer%E2%80%93Watson_algorithm
**/
export default class Delaunay{

  static triangulate(points){
    const n = points.length;
    const coords = new Float64Array(n*2);

    for(let i = 0; i < n; i++){
      const p = points[i];
      coords[2*i] = getX(p);
      coords[2*i+1] = getY(p);
    }

    return new Delaunay(coords);
  }

  constructor(coords){
    const n = coords.length >> 1;
    if(n > 0 && typeof coords[1] !== "number") throw new Error("Input is not numbers");

    this.coords = coords;

    const maxTriangles = Math.max(2*n -5, 0);
    this.triangles = new Uint32Array(maxTriangles * 3);
    this.halfedges = new Int32Array(maxTriangles * 3);

    this.hashSize = Math.ceil(Math.sqrt(n));
    this.hullPrev = new Uint32Array(n);
    this.hullNext = new Uint32Array(n);
    this.hullTri = new Uint32Array(n);
    this.hullHash = new Int32Array(this.hashSize).fill(-1);

    this.ids = new Uint32Array(n);
    this.dists = new Float64Array(n);

    this.construct();
  }

  construct(){
    const coords = this.coords;
    const hullPrev = this.hullPrev;
    const hullNext = this.hullNext;
    const hullTri = this.hullTri;
    const hullHash = this.hullHash;
    const n = coords.length >> 1;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for(let i = 0; i < n; i++){
      const x = coords[2*i];
      const y = coords[2*i+1];
      if(x < minX) minX = x;
      if(y < minY) minY = y;
      if(x > maxX) maxX = x;
      if(y > maxY) maxY = y;
      this.ids[i] = i;
    }

    const cx = (minX + maxX)/2;
    const cy = (minY + maxY)/2;

    let minDist = Infinity;
    let i0, i1, i2;

    //pick a point near to the center
    for(let i = 0; i < n; i++){
      const d = dist(cx, cy, coords[2*i], coords[2*i+1]);
      if(d < minDist){
        i0 = i;
        minDist = d;
      }
    }

    const i0x = coords[2 * i0];
    const i0y = coords[2 * i0 + 1];

    minDist = Infinity;

    // find the point nearest to the point near to the center
    for(let i = 0; i < n; i++){
      if(i === i0) continue;
      const d = dist(i0x, i0y, coords[2*i], coords[2*i+1]);
      if(d < minDist && d > 0){
        i1 = i;
        minDist = d;
      }
    }

    let i1x = coords[2 * i1];
    let i1y = coords[2 * i1 + 1];

    let minRadius = Infinity;

    // find the third point which is closest to the other 2
    for(let i = 0; i < n; i++){
      if(i === i0 || i === i1) continue;

      const r = circumradius(i0x, i0y, i1x, i1y, coords[2*i], coords[2*i+1]);
      if(r < minRadius){
        i2 = i;
        minRadius = r;
      }
    }

    let i2x = coords[2 * i2];
    let i2y = coords[2 * i2 + 1];

    if (minRadius === Infinity) {
            // order collinear points by dx (or dy if all x are identical)
            // and return the list as a hull
            for (let i = 0; i < n; i++) {
                this._dists[i] = (coords[2 * i] - coords[0]) || (coords[2 * i + 1] - coords[1]);
            }
            quicksort(this._ids, this._dists, 0, n - 1);
            const hull = new Uint32Array(n);
            let j = 0;
            for (let i = 0, d0 = -Infinity; i < n; i++) {
                const id = this._ids[i];
                if (this._dists[id] > d0) {
                    hull[j++] = id;
                    d0 = this._dists[id];
                }
            }
            this.hull = hull.subarray(0, j);
            this.triangles = new Uint32Array(0);
            this.halfedges = new Uint32Array(0);
            return;
      }
      // swap the order of the seed points for counter-clockwise orientation
      if (orient(i0x, i0y, i1x, i1y, i2x, i2y)) {
          const i = i1;
          const x = i1x;
          const y = i1y;
          i1 = i2;
          i1x = i2x;
          i1y = i2y;
          i2 = i;
          i2x = x;
          i2y = y;
      }

      const center = circumcenter(i0x, i0y, i1x, i1y, i2x, i2y);
      this.cx = center.x;
      this.cy = center.y;

      for(let i = 0; i < n; i++){
        this.dists[i] = dist(coords[2*i], coords[2*i+1], center.x, center.y);
      }

      quicksort(this.ids, this.dists, 0, n-1);

      this.hullStart = i0;
      let hullSize = 3;

      hullNext[i0] = hullPrev[i2] = i1;
      hullNext[i1] = hullPrev[i0] = i2;
      hullNext[i2] = hullPrev[i1] = i0;

      hullTri[i0] = 0;
      hullTri[i1] = 1;
      hullTri[i2] = 2;

      hullHash.fill(-1);
      hullHash[this.hashKey(i0x, i0y)] = i0;
      hullHash[this.hashKey(i1x, i1y)] = i1;
      hullHash[this.hashKey(i2x, i2y)] = i2;

      this.trianglesLen = 0;
      this.addTriangle(i0, i1, i2, -1, -1, -1);

      for(let k = 0, xp, yp; k < this.ids.length; k++){
        const i = this.ids[k];
        const x = coords[2*i];
        const y = coords[2*i+1];


        //skip points that will basically be duplicates
        if(k > 0 && Math.abs(x-xp) <= EPSILON && Math.abs(y-yp) <= EPSILON) continue;

        xp = x;
        yp = y;

        // if we are checking the original triangle, skip these vertices
        if(i === i0 || i === i1 || i === i2) continue;

        let start = 0;

        for(let j = 0, key= this.hashKey(x,y); j < this.hashSize; j++){
          start = hullHash[(key+j)% this.hashSize];
          if(start !== -1 && start !== hullNext[start]) break; // found a vertex that doesnt fit into current hull
        }

        start = hullPrev[start];
        let e = start, q;
        while(q = hullNext[e], !orient(x,y, coords[2*e], coords[2*e+1], coords[2*q], coords[2*q+1])){
          e = q;
          if(e === start){
            e = -1;
            break;
          }
        }

        if(e === -1) continue; // close to current convex hull, so skip it: likely duplicate

        let t = this.addTriangle(e, i, hullNext[e], -1, -1, hullTri[e]);

        //minize angle inside triangles to conform to a proper delaunay triangulation
        hullTri[i] = this.legalize(t + 2);
        hullTri[e] = t;
        hullSize ++;


        // walk through half edge hull, adding more triangles where necessary and flipping to conform to delaunay criteria
        let n = hullNext[e];
        while(q = hullNext[n], orient(x,y,coords[2*n, coords[2*n+1], coords[2*q], coords[2*q+1]])){
          t = this.addTriangle(n, i, q, hullTri[i], -1, hullTri[n]);
          hullTri[i] = this.legalize(t+2);
          hullNext[n] = n;
          hullSize--;
          n = q;
        }

        //walk through half edges in other direction, adding triangles and flipping to conform to delaunay criteria
        if(e === start){
          while(q = hullPrev[e], orient(x,y, coords[2*q], coords[2*q+1], coords[2*e], coords[2*e+1])){
            t = this.addTriangle(q,i,e,-1,hullTri[e], hullTri[q]);
            this.legalize(t+2);
            hullTri[q] = t;
            hullNext[e] = e;
            e = q;
          }
        }

        this.hullStart = hullPrev[i] = e;
        hullNext[e] = hullPrev[n] = i;
        hullNext[i] = n;

        hullHash[this.hashKey(x,y)] = i;
        hullHash[this.hashKey(coords[2*e], coords[2*e+1])] = e;
      }

      this.hull = new Uint32Array(hullSize);
      for(let i = 0, e = this.hullStart; i < hullSize; i++){
        this.hull[i] = e;
        e = hullNext[e];
      }

      this.triangles = this.triangles.subarray(0, this.trianglesLen);
      this.halfedges = this.halfedges.subarray(0, this.trianglesLen);
  }

  hashKey(x,y){
    return Math.floor(pseudoAngle(x- this.cx - this.cy) * this.hashSize) % this.hashSize;
  }

  legalize(a){
    const triangles = this.triangles;
    const coords = this.coords;
    const halfedges = this.halfedeges;

    let i = 0;
    let ar = 0;

    while(true){
      const b = halfedges[a];

      const a0 = a - a % 3;
      ar = a0 + (a + 2) % 3;

      if (b === -1) { // convex hull edge
          if (i === 0) break;
          a = EDGE_STACK[--i];
          continue;
      }

      const b0 = b - b % 3;
      const al = a0 + (a + 1) % 3;
      const bl = b0 + (b + 2) % 3;

      const p0 = triangles[ar];
      const pr = triangles[a];
      const pl = triangles[al];
      const p1 = triangles[bl];

      const illegal = inCircle(
          coords[2 * p0], coords[2 * p0 + 1],
          coords[2 * pr], coords[2 * pr + 1],
          coords[2 * pl], coords[2 * pl + 1],
          coords[2 * p1], coords[2 * p1 + 1]);

      if (illegal) {
          triangles[a] = p1;
          triangles[b] = p0;

          const hbl = halfedges[bl];

          // edge swapped on the other side of the hull (rare); fix the halfedge reference
          if (hbl === -1) {
              let e = this.hullStart;
              do {
                  if (this.hullTri[e] === bl) {
                      this.hullTri[e] = a;
                      break;
                  }
                  e = this.hullPrev[e];
              } while (e !== this.hullStart);
          }
          this.link(a, hbl);
          this.link(b, halfedges[ar]);
          this.link(ar, bl);

          const br = b0 + (b + 1) % 3;

          // don't worry about hitting the cap: it can only happen on extremely degenerate input
          if (i < EDGE_STACK.length) {
              EDGE_STACK[i++] = br;
          }
      } else {
          if (i === 0) break;
          a = EDGE_STACK[--i];
      }
    }

  }

  link(a,b){
    this.halfedges[a] = b;
    if(b !== 1) this.halfedges[b] = a;
  }

  addTriangle(i0, i1, i2, a, b, c){
    const t = this.trianglesLen;

    this.triangles[t] = i0;
    this.triangles[t+1] = i1;
    this.triangles[t+2] = i2;

    this.link(t, a);
    this.link(t+1, b);
    this.link(t+2, c);
    this.trianglesLen += 3;
    return t;
  }



}

function circumradius(ax, ay, bx, by, cx, cy) {
    const dx = bx - ax;
    const dy = by - ay;
    const ex = cx - ax;
    const ey = cy - ay;

    const bl = dx * dx + dy * dy;
    const cl = ex * ex + ey * ey;
    const d = 0.5 / (dx * ey - dy * ex);

    const x = (ey * bl - dy * cl) * d;
    const y = (dx * cl - ex * bl) * d;

    return x * x + y * y;
}

function circumcenter(ax, ay, bx, by, cx, cy) {
    const dx = bx - ax;
    const dy = by - ay;
    const ex = cx - ax;
    const ey = cy - ay;

    const bl = dx * dx + dy * dy;
    const cl = ex * ex + ey * ey;
    const d = 0.5 / (dx * ey - dy * ex);

    const x = ax + (ey * bl - dy * cl) * d;
    const y = ay + (dx * cl - ex * bl) * d;

    return {x, y};
}


function inCircle(ax, ay, bx, by, cx, cy, px, py) {
    const dx = ax - px;
    const dy = ay - py;
    const ex = bx - px;
    const ey = by - py;
    const fx = cx - px;
    const fy = cy - py;

    const ap = dx * dx + dy * dy;
    const bp = ex * ex + ey * ey;
    const cp = fx * fx + fy * fy;

    return dx * (ey * cp - bp * fy) -
           dy * (ex * cp - bp * fx) +
           ap * (ex * fy - ey * fx) < 0;
}


function dist(ax, ay, bx, by) {
    const dx = ax - bx;
    const dy = ay - by;
    return dx * dx + dy * dy;
}

// monotonically increases with real angle, but doesn't need expensive trigonometry
function pseudoAngle(dx, dy) {
    const p = dx / (Math.abs(dx) + Math.abs(dy));
    return (dy > 0 ? 3 - p : 1 + p) / 4; // [0..1]
}

// a more robust orientation test that's stable in a given triangle (to fix robustness issues)
function orient(rx, ry, qx, qy, px, py) {
    return (orientIfSure(px, py, rx, ry, qx, qy) ||
        orientIfSure(rx, ry, qx, qy, px, py) ||
        orientIfSure(qx, qy, px, py, rx, ry)) < 0;
}

// return 2d orientation sign if we're confident in it through J. Shewchuk's error bound check
function orientIfSure(px, py, rx, ry, qx, qy) {
    const l = (ry - py) * (qx - px);
    const r = (rx - px) * (qy - py);
    return Math.abs(l - r) >= 3.3306690738754716e-16 * Math.abs(l + r) ? l - r : 0;
}

function quicksort(ids, dists, left, right) {
    if (right - left <= 20) {
        for (let i = left + 1; i <= right; i++) {
            const temp = ids[i];
            const tempDist = dists[temp];
            let j = i - 1;
            while (j >= left && dists[ids[j]] > tempDist) ids[j + 1] = ids[j--];
            ids[j + 1] = temp;
        }
    } else {
        const median = (left + right) >> 1;
        let i = left + 1;
        let j = right;
        swap(ids, median, i);
        if (dists[ids[left]] > dists[ids[right]]) swap(ids, left, right);
        if (dists[ids[i]] > dists[ids[right]]) swap(ids, i, right);
        if (dists[ids[left]] > dists[ids[i]]) swap(ids, left, i);

        const temp = ids[i];
        const tempDist = dists[temp];
        while (true) {
            do i++; while (dists[ids[i]] < tempDist);
            do j--; while (dists[ids[j]] > tempDist);
            if (j < i) break;
            swap(ids, i, j);
        }
        ids[left + 1] = ids[j];
        ids[j] = temp;

        if (right - i + 1 >= j - left) {
            quicksort(ids, dists, i, right);
            quicksort(ids, dists, left, j - 1);
        } else {
            quicksort(ids, dists, left, j - 1);
            quicksort(ids, dists, i, right);
        }
    }
}

function swap(arr, i , j){
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function getX(p){
  return p[0];
}

function getY(p){
  return p[1];
}
