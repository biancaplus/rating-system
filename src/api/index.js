import request from "./request";

// // 用户登录
// export function login(data) {
//   return request.post("/user/login", data);
// }

// // 获取用户信息
// export function getUserInfo() {
//   return request.get("/user/info");
// }

// 获取教师列表
export function getTeacherList(page, pageSize, sort, keywords) {
  let url = `/teacherInfo/list?page=${page}&pagesize=${pageSize}&order=${sort}`;
  if (keywords) {
    url += `&keywords=${keywords}`;
  }
  return request.get(url);
}

// 获取教师详情
export function getTeacherDetail(id) {
  return request.get(`/teacherInfo/getDetailById?id=${id}`);
}

// 获取评论列表
export function getCommentList(teacherId, page, pageSize, order) {
  return request.get(
    `/ratings/getListByTeacherId?id=${teacherId}&page=${page}&pagesize=${pageSize}&order=${order}`
  );
}

// 新增评分
export function addRating(data) {
  return request.post("/ratings/add", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

// 获取评分分布
export function getRatingDistribution(teacherId) {
  return request.get(`/ratings/getRatingDistribution?id=${teacherId}`);
}
