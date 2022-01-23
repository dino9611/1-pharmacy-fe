import React, { useState } from 'react';
import './style.css';
import SquareButton from '../authInventory/squareButton';

const HomeContainer5 = (props) => {
    const [ viewMoreArticles, setViewMoreArticles ] = useState(false);

    const articles = [
        { 
            link: "https://www.halodoc.com/artikel/inilah-gejala-kanker-darah-yang-paling-umum-muncul", 
            image: "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/01/21104530/Inilah-Gejala-Kanker-Darah-yang-Paling-Umum-Muncul.jpg.webp", 
            title: "These are the most common symptoms of blood cancer",
            subTitle: "Blood cancer is divided into many types. Each type certainly has different symptoms..."
        },
        {
            link: "https://www.halodoc.com/artikel/ini-manfaat-buat-bit-bagi-kesehatan-tubuh-anak", 
            image: "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/01/21080003/Ini-Manfaat-Buat-Bit-Bagi-Kesehatan-Tubuh-Anak-01.jpg.webp", 
            title: "These are the benefits of beets fruit for children's health",
            subTitle: "There are several health benefits that children can get from eating fruit..."
        },
        {
            link: "https://www.halodoc.com/artikel/inilah-gejala-kanker-darah-yang-paling-umum-muncul", 
            image: "https://d1bpj0tv6vfxyp.cloudfront.net/articles/1007b715-8eac-4180-94fc-dff7b8f7bdbd_article_image_url.webp", 
            title: "The 7 Amazing Benefits From Eating Dark Chocolate",
            subTitle: "Dark chocolate is rich in nutrients needed for a healthy body. Made from tree seeds..."
        },
    ];

    const moreArticles = [
        { 
            link: "https://www.halodoc.com/artikel/harus-tahu-7-gejala-umum-kanker-limfoma", 
            image: "https://d1bpj0tv6vfxyp.cloudfront.net/articles/d909b695-6d3a-499c-8b4e-af74c990eaf5_article_image_url.webp", 
            title: "The 7 Most Common Symptoms of Lymphoma Cancer",
            subTitle: "Lymphoma cancer can cause several symptoms in sufferers. There is no harm ..."
        },
        {
            link: "https://www.halodoc.com/artikel/inilah-cara-alami-untuk-mengecilkan-pori-pori-wajah", 
            image: "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/01/21073145/inilah-cara-alami-untuk-mengecilkan-pori-pori-wajah-halodoc.jpg.webp", 
            title: "Here's a Natural Way to Shrink Facial Pores",
            subTitle: "Large pores are a common skin problem. This condition can cause problems..."
        },
        {
            link: "https://www.halodoc.com/artikel/alasan-sinar-matahari-pagi-bisa-pengaruhi-kesehatan-mental", 
            image: "https://d1bpj0tv6vfxyp.cloudfront.net/articles/679204_31-12-2020_11-20-29.webp", 
            title: "Reasons Morning Sun Can Affect Your Mental Health",
            subTitle: "Maintaining mental health can be done in many ways, one of which is diligently..."
        },
        {
            link: "https://www.halodoc.com/artikel/gejala-awal-kanker-prostat-yang-sering-tidak-disadari", 
            image: "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/01/21073450/gejala-awal-kanker-prostat-yang-sering-tidak-disadari-halodoc.jpg.webp", 
            title: "Early Symptoms of Prostate Cancer that Are Often Unaware",
            subTitle: "Prostate cancer is a disease that is prone to occur in men and is usually difficult to treat..."
        },
        {
            link: "https://www.halodoc.com/artikel/bagaimana-cara-mengobati-sakit-pinggang-sebelah-kiri", 
            image: "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/01/21072726/Bagaimana-Cara-Mengobati-Sakit-Pinggang-Sebelah-Kiri.jpg.webp", 
            title: "Work Makes You Sit Too Much? This is How to Treat Left Back Pain",
            subTitle: "Left back pain comes from muscles, joints, middle back, or other organs..."
        },
        {
            link: "https://www.halodoc.com/artikel/resep-tumis-jamur-saus-tiram-ala-restoran", 
            image: "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/01/20111803/Resep-Tumis-Jamur-Saus-Tiram-ala-Restoran_Halodoc.jpg.webp", 
            title: "Restaurant-style Sauteed Mushroom Oyster Sauce Recipe",
            subTitle: "Not only delicious to eat, mushrooms also contain lots of vitamins and nutrients for..."
        },
    ];

	return (
		<div className="d-flex flex-column justify-content-center align-items-center mt-4" style={{ backgroundColor: "white", height: "100%" }}>
            <div className="d-flex flex-row justify-content-around flex-wrap my-4" style={{ width: "90vw" }}>
                {
                    articles.map((article) => {
                        return (
                            <a href={article.link} style={{ textDecoration: "none" }}>
                                <div className="articleContainer d-flex flex-column justify-content-center align-items-center p-3 mb-4">
                                    <img 
                                        src={article.image} 
                                        alt="" 
                                        width="90%"
                                        height="65%"
                                        style={{ objectFit: "cover" }}
                                    />
                                    <div className="px-3" style={{ height: "30%" }}>
                                        <h6 className="mt-3">{article.title}</h6>
                                        <p className="lh-1" style={{ fontSize: 13, color: "gray" }}>{article.subTitle}</p>
                                    </div>
                                </div>
                            </a>
                        )
                    })
                }
                {
                    viewMoreArticles &&
                    moreArticles.map((moreArticle) => {
                        return (
                            <a href={moreArticle.link} style={{ textDecoration: "none" }}>
                                <div className="articleContainer d-flex flex-column justify-content-center align-items-center p-3 mb-4">
                                    <img 
                                        src={moreArticle.image} 
                                        alt="" 
                                        width="90%"
                                        height="65%"
                                        style={{ objectFit: "cover" }}
                                    />
                                    <div className="px-3" style={{ height: "30%" }}>
                                        <h6 className="mt-3">{moreArticle.title}</h6>
                                        <p className="lh-1" style={{ fontSize: 13, color: "gray" }}>{moreArticle.subTitle}</p>
                                    </div>
                                </div>
                            </a>
                        )
                    })
                }
            </div>
            {
                viewMoreArticles ?
                <SquareButton className="mb-5" label="CLOSE ▴" onClick={() => setViewMoreArticles(false)}/>
                :
                <SquareButton className="mb-5" label="VIEW MORE ▾" onClick={() => setViewMoreArticles(true)}/>
            }
        </div>
	);
}

export default HomeContainer5;
