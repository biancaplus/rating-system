import React, { lazy } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

const Home = lazy(() => import("../pages/Home"));
const Rating = lazy(() => import("../pages/Rating"));
const Management = lazy(() => import("../pages/Management"));
const TeacherManagement = lazy(() =>
  import("../components/Management/TeacherManagent")
);
const RatingAudit = lazy(() => import("../components/Management/RatingAudit"));

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
  // {
  //   path: "/management",
  //   element: <Management />,
  //   children: [
  //     { path: "teacher-management", element: <TeacherManagement /> },
  //     { path: "rating-audit", element: <RatingAudit /> },
  //   ],
  // },
  {
    path: "/management",
    element: <ProtectedRoute />, // 路由守卫
    children: [
      {
        index: true,
        element: <Navigate to="teacher-management" replace />, // 默认跳转
      },
      {
        element: <Management />, // 管理子页面
        children: [
          { path: "teacher-management", element: <TeacherManagement /> },
          { path: "rating-audit", element: <RatingAudit /> },
        ],
      },
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
