import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigator from "../components/Navigator";
import RatingTeacher from "../components/Rating/RatingTeacher";
import RatingReviews from "../components/Rating/RatingReviews";
import { getTeacherDetail } from "@/api/index";

const Rating = () => {
  // const teacherList = [
  //   {
  //     id: 1,
  //     name: "张三",
  //     faculty: "计算机科学与技术学院",
  //     title: "教授",
  //     rating: 4.5,
  //     rating_count: 10500,
  //     starList: [
  //       {
  //         rating: 5,
  //         count: 5500,
  //       },
  //       {
  //         rating: 4,
  //         count: 3500,
  //       },
  //       {
  //         rating: 3,
  //         count: 360,
  //       },
  //       {
  //         rating: 2,
  //         count: 940,
  //       },
  //       {
  //         rating: 1,
  //         count: 200,
  //       },
  //     ],
  //     reviews_count: 105,
  //     reviews: [
  //       {
  //         date: "2024-05-30",
  //         content:
  //           "计算机科学与技术学院计算机科学与技术学院计算机科学与技术学院计算机科学与技术学院计算机科学与技术学院计算机科学与技术学院计算机科学与技术学院计算机科学与技术学院计算机科学与技术学院计算机科学与技术学院",
  //         rating: 4,
  //       },
  //       {
  //         date: "2024-10-10",
  //         content:
  //           "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem totam voluptatem doloribus, neque, nobis harum earum deleniti officiis eveniet repellendus sequi amet facere mollitia repudiandae libero hic ullam? Officia, a?",
  //         rating: 5,
  //       },
  //       {
  //         date: "2024-11-28",
  //         content:
  //           "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem totam voluptatem doloribus, neque, nobis harum earum deleniti officiis eveniet repellendus sequi amet facere mollitia repudiandae libero hic ullam? Officia, a?",
  //         rating: 3,
  //       },
  //     ],
  //     courses: ["数据结构与算法", "人工智能导论", "机器学习"],
  //     introduction:
  //       "清华大学计算机系博士，人工智能领域专家，主持国家自然科学基金项目3项，发表SCI论文20余篇，擅长将前沿算法应用于实际工业场景。",
  //   },
  //   {
  //     id: 2,
  //     name: "李四",
  //     faculty: "文学院",
  //     title: "副教授",
  //     rating: 3.2,
  //     rating_count: 8900,
  //     starList: [
  //       {
  //         rating: 5,
  //         count: 2500,
  //       },
  //       {
  //         rating: 4,
  //         count: 3500,
  //       },
  //       {
  //         rating: 3,
  //         count: 1760,
  //       },
  //       {
  //         rating: 2,
  //         count: 940,
  //       },
  //       {
  //         rating: 1,
  //         count: 200,
  //       },
  //     ],
  //     reviews_count: 900,
  //     reviews: [
  //       {
  //         date: "2024-05-30",
  //         content: "lorem ipsum dolor sit amet",
  //         rating: 2,
  //       },
  //       {
  //         date: "2024-10-10",
  //         content: "lorem ipsum dolor sit amet",
  //         rating: 3,
  //       },
  //       {
  //         date: "2024-11-28",
  //         content: "lorem ipsum dolor sit amet",
  //         rating: 4,
  //       },
  //     ],
  //     courses: ["中国古代文学", "唐宋诗词研究", "文学批评方法"],
  //     introduction:
  //       "北京大学文学博士，专注唐宋文学研究20年，出版《唐宋诗风流变》等专著3部，曾获教育部人文社科优秀成果奖。",
  //   },
  //   {
  //     id: 3,
  //     name: "王五",
  //     faculty: "经济与管理学院",
  //     title: "讲师",
  //     rating: 5,
  //     rating_count: 1000,
  //     starList: [
  //       {
  //         rating: 5,
  //         count: 830,
  //       },
  //       {
  //         rating: 4,
  //         count: 35,
  //       },
  //       {
  //         rating: 3,
  //         count: 60,
  //       },
  //       {
  //         rating: 2,
  //         count: 45,
  //       },
  //       {
  //         rating: 1,
  //         count: 30,
  //       },
  //     ],
  //     reviews_count: 100,
  //     reviews: [
  //       {
  //         date: "2024-05-30",
  //         content: "lorem ipsum dolor sit amet",
  //         rating: 5,
  //       },
  //       {
  //         date: "2024-10-10",
  //         content: "lorem ipsum dolor sit amet",
  //         rating: 5,
  //       },
  //     ],
  //     courses: ["微观经济学", "计量经济学", "产业经济学"],
  //     introduction:
  //       "伦敦政治经济学院硕士，研究产业经济与区域发展，参与多项地方政府规划项目，教学风格生动贴近实际案例。",
  //   },
  //   {
  //     id: 4,
  //     name: "赵六",
  //     faculty: "医学院",
  //     title: "教授",
  //     rating: 4,
  //     rating_count: 1000,
  //     starList: [
  //       {
  //         rating: 5,
  //         count: 830,
  //       },
  //       {
  //         rating: 4,
  //         count: 35,
  //       },
  //       {
  //         rating: 3,
  //         count: 60,
  //       },
  //       {
  //         rating: 2,
  //         count: 45,
  //       },
  //       {
  //         rating: 1,
  //         count: 30,
  //       },
  //     ],
  //     reviews_count: 75,
  //     reviews: [
  //       {
  //         date: "2024-05-30",
  //         content: "lorem ipsum dolor sit amet",
  //         rating: 5,
  //       },
  //       {
  //         date: "2024-10-10",
  //         content: "lorem ipsum dolor sit amet",
  //       },
  //       {
  //         date: "2024-11-28",
  //         content: "lorem ipsum dolor sit amet",
  //         rating: 5,
  //       },
  //     ],
  //     courses: ["内科学", "临床诊断学", "医学统计学"],
  //     introduction:
  //       "协和医学院博士，主任医师，深耕心血管疾病诊疗15年，创新性提出'阶梯式治疗方案'，临床经验丰富。",
  //   },
  //   {
  //     id: 5,
  //     name: "钱七",
  //     faculty: "艺术学院",
  //     title: "副教授",
  //     rating: 4,
  //     rating_count: 1000,
  //     starList: [
  //       {
  //         rating: 5,
  //         count: 830,
  //       },
  //       {
  //         rating: 4,
  //         count: 35,
  //       },
  //       {
  //         rating: 3,
  //         count: 60,
  //       },
  //       {
  //         rating: 2,
  //         count: 45,
  //       },
  //       {
  //         rating: 1,
  //         count: 30,
  //       },
  //     ],
  //     reviews_count: 32,
  //     reviews: [
  //       {
  //         date: "2024-05-30",
  //         content: "lorem ipsum dolor sit amet",
  //         rating: 5,
  //       },
  //       {
  //         date: "2024-10-10",
  //         content: "lorem ipsum dolor sit amet",
  //         rating: 5,
  //       },
  //       {
  //         date: "2024-11-28",
  //         content: "lorem ipsum dolor sit amet",
  //         rating: 5,
  //       },
  //     ],
  //     courses: ["西方美术史", "油画技法", "艺术策展"],
  //     introduction:
  //       "巴黎国立高等美术学院访问学者，作品入选全国美展，擅长将传统技法与当代艺术观念融合，培养多名青年艺术家。",
  //   },
  //   {
  //     id: 6,
  //     name: "孙八",
  //     faculty: "机械工程学院",
  //     title: "教授",
  //     rating: 5,
  //     rating_count: 1000,
  //     starList: [
  //       {
  //         rating: 5,
  //         count: 830,
  //       },
  //       {
  //         rating: 4,
  //         count: 35,
  //       },
  //       {
  //         rating: 3,
  //         count: 60,
  //       },
  //       {
  //         rating: 2,
  //         count: 45,
  //       },
  //       {
  //         rating: 1,
  //         count: 30,
  //       },
  //     ],
  //     reviews_count: 92,
  //     reviews: [
  //       {
  //         date: "2024-05-30",
  //         content: "lorem ipsum dolor sit amet",
  //         rating: 5,
  //       },
  //       {
  //         date: "2024-10-10",
  //         content: "lorem ipsum dolor sit amet",
  //         rating: 5,
  //       },
  //       {
  //         date: "2024-11-28",
  //         content: "lorem ipsum dolor sit amet",
  //         rating: 5,
  //       },
  //     ],
  //     courses: ["机械设计基础", "机器人学", "先进制造技术"],
  //     introduction:
  //       "国家杰出青年科学基金获得者，主持研发的工业机器人系统已应用于汽车制造领域，获国家科技进步二等奖。",
  //   },
  // ];

  const { id } = useParams();
  // const teacher = teacherList.find((item) => item.id === parseInt(id));
  const [teacher, setTeacher] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTeacher = async () => {
      setIsLoading(true);
      const res = await getTeacherDetail(id);
      let obj = res.data;
      setTeacher(obj);
      setIsLoading(false);
    };
    getTeacher();
  }, [id]);
  return (
    <>
      <Navigator />
      {teacher && <RatingTeacher teacher={teacher} isLoading={isLoading} />}
      {teacher && <RatingReviews id={id} />}
    </>
  );
};

export default Rating;
