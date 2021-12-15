import axios from "axios";
import cheerio from "cheerio";
import { connection } from "./db";

const getCharacters = async () => {
  const url = `https://attackontitan.fandom.com/wiki/List_of_characters/Anime`;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const charactersDivs = $("div.characterbox-container");
  const list = [];
  for (let i = 11; i < charactersDivs.length; i++) {
    const e = charactersDivs[i];
    const name = $(e)
      .find("table>tbody>tr>td>div>a")
      .attr("title")
      ?.split("(Anime)")[0]
      .trimEnd();

    const link = $(e).find("table>tbody>tr>td>div>a").attr("href");

    const img = $(e)
      .find("table>tbody>tr>td>div>a>img")
      .attr("data-src")
      ?.split("/revision")[0];

    list.push({ name, img, link: `https://attackontitan.fandom.com${link}` });
  }
  return list;
};

(async function () {
  const characters = await getCharacters();
  characters.forEach((e) => {
    connection.query(
      `INSERT INTO Characters (name,image,link) values ("${e.name}", "${e.img}", "${e.link}")`,
      (err) => {
        if (err) throw err;
      }
    );
  });
})();
