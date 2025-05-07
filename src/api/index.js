import request from "./request";

// 用户注册
export function register(data) {
  return request.post("/user/register", data);
}

// 用户登录
export function login(data) {
  return request.post("/user/login", data);
}

// 获取用户信息
export function getUserInfo() {
  return request.get("/userInfo/getInfo");
}

// 修改用户密码
export function editPassword(data) {
  return request.post("/userInfo/updatePwd", data);
}

// 新增教师
export function addTeacher(data) {
  return request.post("/teachers/add", data);
}

// 修改教师
export function editTeacher(data) {
  return request.post("/teachers/update", data);
}

// 删除教师
export function deleteTeacher(id) {
  return request.get(`/teachers/delete?id=${id}`);
}

// 获取教师列表
export function getTeacherList(
  page,
  pageSize = 10,
  sort = null,
  keywords = ""
) {
  let url = `/teacherInfo/list?page=${page}&pagesize=${pageSize}`;
  if (keywords) {
    url += `&keywords=${keywords}`;
  }
  if (sort) {
    url += `&order=${sort}`;
  }
  return request.get(url);
}

// 获取教师详情
export function getTeacherDetail(id) {
  return request.get(`/teacherInfo/getDetailById?id=${id}`);
}

// 新增评分
export function addRating(data) {
  return request.post("/ratings/add", data);
}

// 获取评论列表
export function getCommentList(teacherId, page, pageSize, order) {
  return request.get(
    `/ratingInfo/getListByTeacherId?id=${teacherId}&page=${page}&pagesize=${pageSize}&order=${order}`
  );
}

// 获取评分分布
export function getRatingDistribution(teacherId) {
  return request.get(`/ratingInfo/getRatingDistribution?id=${teacherId}`);
}
