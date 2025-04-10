import React, { lazy } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Rating = lazy(() => import("../pages/Rating"));

// 父路由包装组件（必须有 Outlet 以渲染嵌套的子路由）
const RatingWrapper = () => <Outlet />;

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/rating",
    element: <RatingWrapper />,
    children: [
      { index: true, element: <Rating /> }, // 匹配未添加参数
      { path: ":id", element: <Rating /> }, // 匹配添加参数
      // { path: ":id/:name", element: <Rating /> }, // 匹配多个参数
    ],
  },
];

export function RenderRoutes({ routes: routeList = routes }) {
  return routeList.map((route, i) => {
    const { children, ...rest } = route;
    return (
      <Route key={i} {...rest}>
        {Array.isArray(children) ? RenderRoutes({ routes: children }) : null}
      </Route>
    );
  });
}
