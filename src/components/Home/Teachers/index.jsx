import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Form, Container, Row, InputGroup } from "react-bootstrap";
import debounce from "lodash/debounce";
import "./index.scss";
import Card1 from "../../Card/Card-1";
import Card2 from "../../Card/Card-2";
import DynamicPagination from "@/components/DynamicPagination";
import { useTranslation } from "react-i18next";
import { getTeacherList } from "@/api/index.js";
import { useScrollToElement } from "@/hooks/useScrollToElement";
function Teachers() {
  const { t } = useTranslation();
  const [activeView, setActiveView] = useState("grid");
  const [teacherList, setTeacherList] = useState([]);
  // const teacherList = [
  //   {
  //     id: 1,
  //     name: "张三",
  //     faculty: "计算机科学与技术学院",
  //     title: "教授",
  //     rating: 4.5,
  //     rating_count: 10500,
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
  //     rating_count: 7500,
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
  //     rating_count: 3200,
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
  //     rating_count: 9200,
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
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;
  const [totalPages, setTotalPages] = useState(0);
  const teachersRef = useRef(null);
  const [sort, setSort] = useState(2);
  const [keywords, setKeywords] = useState("");

  const sortChange = (value) => {
    setSort(value);
    setCurrentPage(1);
  };
  const searchChange = (value) => {
    setKeywords(value);
    setCurrentPage(1);
  };

  // 防抖包装：延迟500ms执行
  const debouncedSearch = useMemo(() => debounce(searchChange, 500), []);

  // 清除副作用：组件卸载时取消未完成的 debounce
  useCallback(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    const getTeacher = async () => {
      const res = await getTeacherList(currentPage, pageSize, sort, keywords);
      console.log(res);
      let list = res.data.list || [];
      setTeacherList(list);
      setTotalPages(res.data.totalPage);
    };
    getTeacher();
  }, [currentPage, sort, keywords]);

  useScrollToElement(teachersRef, 74, currentPage);

  return (
    <>
      <section className="teachers-list-section">
        <Container>
          <div className="toolbar-wrap">
            <div className="toolbar-btn-wrap">
              <div
                className={`toolbar-btn ${
                  activeView === "grid" ? "active" : ""
                }`}
                onClick={() => setActiveView("grid")}
              >
                <i className="bi bi-grid-fill fs-5"></i>
                <span>{t("grid")}</span>
              </div>
              <div
                className={`toolbar-btn ${
                  activeView === "list" ? "active" : ""
                }`}
                onClick={() => setActiveView("list")}
              >
                <i className="bi bi-list fs-3"></i>
                <span>{t("list")}</span>
              </div>
            </div>

            <div className="condition-wrap">
              <div className="select-wrap">
                <div className="text-nowrap">{t("sort")}：</div>
                <Form.Select
                  aria-label="Default select example"
                  className="custom-form-select"
                  onChange={(e) => sortChange(e.target.value)}
                  value={sort}
                >
                  <option value={1}>{t("score")}</option>
                  <option value={2}>{t("ratingNumber")}</option>
                  <option value={3}>{t("initials")}</option>
                </Form.Select>
              </div>
              <div className="search-wrap">
                <InputGroup className="custom-input-group">
                  <Form.Control
                    placeholder={t("search")}
                    aria-label={t("search")}
                    aria-describedby="search-btn"
                    className="custom-input"
                    onChange={(e) => debouncedSearch(e.target.value)}
                  />
                </InputGroup>
                <i className="bi bi-search my-auto" id="search-btn"></i>
              </div>
            </div>
          </div>
          <div className="tab-content" ref={teachersRef}>
            {activeView === "grid" ? (
              <div
                className={`tab-pane ${activeView === "grid" ? "active" : ""}`}
              >
                <Row className="teacher-grid-wrap">
                  {teacherList.map((item) => {
                    return <Card1 key={item.id} ItemData={item}></Card1>;
                  })}
                </Row>
                <DynamicPagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  maxVisiblePages={3}
                  showFirstLast={false}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            ) : (
              <div
                className={`tab-pane ${activeView === "list" ? "active" : ""}`}
              >
                <Row className="teacher-list-wrap">
                  {teacherList.map((item) => {
                    return <Card2 key={item.id} ItemData={item}></Card2>;
                  })}
                </Row>
                <DynamicPagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  maxVisiblePages={3}
                  showFirstLast={false}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}

export default Teachers;
