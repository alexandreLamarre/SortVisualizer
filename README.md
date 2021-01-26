# Sort Algorithm Visualizer

This is a web-app that visualizes 12+ common sorting algorithms using 1 and 2 dimensional data. It uses several different and interchangeable methods for data visualization.

## Table of contents

- [Visualization Types](#Visualization-Types)
  - [2D](#2D)
    - [Scatter Plot](#Scatter-plot)
    - [Swirl Dots](#Swirl-dots)
    - [Disparity Dots](#Disparity-dots)
  - [3D](#3D)
- [Algorithms](#Algorithms)
  - [Summary](#Summary)
  - **Insertion Family**
    - [Insertion sort](#Insertion-sort)
    - [Binary insertion sort](#Binary-insertion-sort)
  - **Merge family**
    - [Merge sort](#Merge-sort)
  - **Selection family**
    - [Selection sort](#Selection-sort)
    - [Heap sort](#Heap-sort)
    - [Ternary heap sort](#Ternary-heap-sort)
  - **Exchange family**
    - [Quick sort](#Quick-sort)
    - [Dual pivot quick sort](#Dual-pivot-quick-sort)
  - **Non-comparison family**
    - [Counting sort](#Counting-sort)
    - [Radix sort(base 4)](#Radix-sort)
  - **Hybrid family**
    - [Tim sort](#Tim-sort)
    - [Intro sort](#Intro-sort)
- [References](#References)

### Visualization-Types

### 2D
- [Scatter plot](#Scatter-plot)
- [Swirl dots](#Swirl-dots)
- [Disparity dots](#Disparity-dots)

#### Scatter plot

#### Swirl dots

#### Disparity dots

#### 3D

In progress.

### Algorithms

#### Summary

| Algorithms | Time Complexity | Space Complexity | Stable | Approximate runtimes(2048)|
| ---------- | :-------------: | :--------------: | :----: | :-----------------------: |
| Insertion sort | O(n^2)      | O(n)| Yes | 139ms |
| Binary insertion sort | O(n^2) | O(n) | Yes | 293ms |
| Merge sort | O(nlog(n)) | O(n) | Yes | 15ms |
| Selection sort | O(n^2) | O(n) | No | 226ms |
| Heap sort | O(nlog(n)) | O(n) | Yes | 5ms |
| Ternary heap sort | O(nlog(n)) | O(n) | Yes | 9ms |
| Quick sort | O(n^2) | O(n) | No | 7ms |
| Dual pivot quick sort | O(n^2) | O(n) | No | 6ms |
| Counting sort | O(n+ k), k = possible values in array | O(n) | Yes | 2ms | 
| Radix sort | O(nk) k = radix base | O(n) | Yes | 11ms |
| Tim sort | O(nlog(n)) | O(n) | Yes | 13ms | 
| Intro sort | O(nlog(n)) | O(n) | Yes | 6ms |

### Refereces

- Cormen, Thomas H., et al. **Introduction to algorithms**. MIT press, 2009.
- Eberly, David. **3D game engine design: a practical approach to real-time computer graphics**. CRC Press, 2006.


<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

-->
