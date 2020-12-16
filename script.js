const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
let url = "https://bacakomik.co/daftar-manga/";

const fetchData = async() => {
    let page_manga = [];
    let url_manga = [];
    let chap_mangaLink = [];
    let chap_manga = [];
    let pageCounter = 0;
    let nextPage = 1;
    //get manga link
    // try {
    //     while(pageCounter < nextPage){
    //     let urls = url;
    //     const res = await axios.get(urls);
    //     const $ = cheerio.load(res.data);
    //     //setTimeout(() => {
    //     let nextPageLink = $('.pagination').last().find('a').attr('href');
    //     let nextPageTrim = nextPageLink.replace('https://bacakomik.co/daftar-manga/page/','');
    //     nextPage = nextPageTrim.replace('/','');
    //     console.log(nextPageLink);
    //     console.log(nextPage);
    //     pageCounter++;
    //     urls = nextPageLink;
    //     //},10000 * nextPage)
    //     }
    // } catch(error){
    //     console.log(error);
    // }
    try{
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const itemManga = $('.animepost');
        for(let i = 0; i < itemManga.length; i++) {
            let item = itemManga.eq(i);
            const linkManga = item.find('a')
            .attr('href')
            .trim();
            url_manga.push(linkManga);
            console.log(linkManga);
        }
    } catch(error){
        console.log(error);
    }
    //get chapter
    try {
        for(let i = 0; i < 1;i++){
            const response = await axios.get(url_manga[i]);
            const $ = cheerio.load(response.data);
            const itemChapter = $('#chapter_list').find('li');
            for(let j = 0; j < itemChapter.length;j++){
                let item = itemChapter.eq(j);
                const itemChapLink = item
                .find('a').attr('href').trim();
                chap_mangaLink.push(itemChapLink);
                console.log(itemChapLink);
            }
        }
    } catch(error){
        console.log(error);
    }

    try {
        for(let i = 0;i < chap_mangaLink.length;i++){
            const response = await axios.get(chap_mangaLink[i]);
            const $ = cheerio.load(response.data);
            const itemImage = $('.chapter postbody').find('article')
            .find('.chapter-area').find('.chapter-content').find('#Baca-Komik > img').attr('src');
            let chapter_image = [];
            chapter_image.push(itemImage);
            console.log(chapter_image);
            // for(let j = 0;j < itemImage.length;j++){
            //     const item = itemImage.eq(j);
            //     const images = item.find('img').attr('src');
            // console.log(images);
            //}
        }

    } catch(error){
        console.log(error);
    }

}

function getTotalPages(data){

}

fetchData();
