import React from "react";
import BlogCard from "./BlogCard"; // Assuming BlogCard is in the same directory

const blogData = [
  {
    title: "Diabetes types and treatments",
    description:
      "Diabetes is a chronic condition that impairs the body’s ability to process blood glucose. There are several types, including type 1, type 2, and gestational diabetes, which have various treatments.",
    imgSrc: "/images/blogsImages/blog1.png",
    link: "https://www.medicalnewstoday.com/articles/323627",
  },
  {
    title: "Diabetes - WHO",
    description:
      "The number of people with diabetes rose from 108 million in 1980 to 422 million in 2014. Prevalence has been rising more rapidly in low- and middle-income countries.",
    imgSrc: "/images/blogsImages/blog2.png",
    link: "https://www.who.int/news-room/fact-sheets/detail/diabetes",
  },
  {
    title: "Journal of Diabetes by Zachary T. Bloomgarden and Guang Ning",
    description:
      "Journal of Diabetes (JDB) is an open access journal devoted to diabetes research, therapeutics, and education. It is an official journal of the Chinese Society of Endocrinology.",
    imgSrc: "/images/blogsImages/blog3.png",
    link: "https://onlinelibrary.wiley.com/journal/17530407",
  },
  {
    title: "What is Diabetes? Types, Symptoms, and Causes - Harvard Health",
    description: "Diabetes occurs when the body has trouble using the sugar it gets from food for energy. Sugar builds up in the bloodstream.",
    imgSrc: "/images/blogsImages/blog4.png",
    link: "https://www.health.harvard.edu/topics/diabetes",
  },
  {
    title: "PREVENTING DIABETES",
    description: "Yes, type 2 diabetes can be prevented with thoughtful lifestyle changes and plant-rich diets",
    imgSrc: "/images/blogsImages/blog5.png",
    link: "https://drmohans.com/preventing-diabetes/",
  },
  {
    title: "Warning Signs and Symptoms",
    description: "Know the warning signs and symptoms of diabetes and diabetes complications so you can take action to improve your health",
    imgSrc: "/images/blogsImages/blog6.png",
    link: "https://diabetes.org/about-diabetes/warning-signs-symptoms",
  },
  // Add more blog entries if needed
];

const Blogs = () => {
  return (
    <div className='flex flex-wrap justify-around mt-10'>
      {blogData.map((blog, index) => (
        <BlogCard key={index} title={blog.title} description={blog.description} imgSrc={blog.imgSrc} link={blog.link} />
      ))}
    </div>
  );
};

export default Blogs;
