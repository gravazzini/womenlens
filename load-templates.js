// This script generates HTML nodes for the home page of the project
const nav = d3.select("#questions-navigation");
const home = d3.select(".cover");
const intro = d3.select(".intro");

const questions = d3.select("#questions");
if (questions.size() > 0) {
  Promise.all([d3.text("info.yml"), d3.text("./questions.yml")]).then(
    ([info, questionsData]) => {
      info = jsyaml.load(info);
      questionsData = jsyaml.load(questionsData);

      const cover = home.selectAll("div").data([info]).enter().append("div");

      cover
        .append("div")
        .attr(
          "style",
          (d) => `background-image: url(./assets/${d["cover-image"]})`
        )
        .classed("cover__image", true);
      cover.append("div").classed("cover__background", true);
      cover
        .append("h3")
        .text("DHDK - Electronic Publishing and Digital Storytelling 2021/2022") 
        .classed("cover__heading", true);
      cover
        .append("h1")
        .text((d) => d.title)
        .classed("cover__title", true);
      cover
        .append("h2")
        .text((d) => d.subtitle)
        .classed("cover__subtitle", true);

      cover
        .append("div")
        .selectAll("p")
        .data((d) => d.authors)
        .join("p")
        .text((d) => d.name)
        .classed("authors", true);

      const introText = intro.selectAll("div").data([info]).enter().append("div");
      introText.append("p").text(d => d.description);

      const question =
        //questions.selectAll('div').data(questionsData).enter().append('div').classed("question__card", true);
      question.append('h2').text(d => d.index + ". " + d.title).classed("question__title", true);
      question.append('img').attr('src', d => `./${d.folder}/${d.cover}`);
      const questionMeta = question.append("div").classed("question__info", true);
      questionMeta.append('p').text(d => d.description);

      question.on("click", (e, d) => {
        window.location.href = d.folder;
      });
    }
  );
}

const questionsNavigation = d3.select("#questions-navigation");
if (questionsNavigation.size() > 0) {
  Promise.all([d3.text("./questions.yml")]).then(([questionsData]) => {
    questionsData = jsyaml.load(questionsData);

    questionsNavigation
      .append("a")
      .style("padding", "0 1rem")
      .attr("href", "./")
      .append("h4")
      .text("Home");

    const questionsList = questionsNavigation
      .append("div")
      .classed("questions--list", true);

    let questionsDropdown = questionsList
      .append("h4")
      .classed("navigation-handler", true)
      .style("cursor", "pointer")
      .text("Research topics")
      .append("div");

    questionsList
      .append("ol")
      .classed("closed", true)
      .style("height", "calc(1rem + " + questionsData.length * 50 + "px)")
      .selectAll("li")
      .data(questionsData)
      .join("li")
      .append("a")
      .attr("href", (d) => "./" + d.folder)
      .text((d) => d.title);

    questionsList.select(".navigation-handler").on("click", function () {
      const list = questionsList.select("ol");
      const isOpen = list.classed("closed");
      list.classed("closed", !isOpen);
    });
  });
}

const footer = d3.select(".footer");
if (footer.size() > 0) {
  // Footer //
  Promise.all([
      d3.text('./info.yml')
    ])
    .then(([info]) => {
      info = jsyaml.load(info);
      const footerContainer = footer
        .append("div")
        .classed("footer__container", true);

      const footerLogo1 = footerContainer
        .append("div")
        .classed("footer__item", true)
        .append("div")
        .classed("logo logo-density", true);

      const footerLogo2 = footerContainer
        .append("div")
        .classed("footer__item", true)
        .append("div")
        .classed("logo logo-politecnico", true);

      const footerAuthors = footerContainer
        .append("div")
        .classed("footer__item", true);

      footerAuthors
        .append("h5")
        .text("Project by");

      footerAuthors
        .selectAll("p")
        .data(info.authors)
        .join("p")
        .text(d => d.name);
    })
}


document.addEventListener("DOMContentLoaded", () => {
  let footer = document.getElementById("footer");
  footer.style.fontSize = "1.0rem";
  footer.style.lineHeight = "1.5";
  footer.style.textIndent = "1.2rem";
  footer.style.fontFamily = "acumin-pro, helvetica, sans-serif";

  let textFooter = [
    "Timespan: pioneer, revolutionary and visionary photographers",
    "Geographical perspective: photographers’ origin countries",
    "Photographers’ occupations over the decades",
    "Photographers’ occupations over the countries"
  ]

  let textFooterDescriptions = [
    "The chronological division of the photographers follows the three volumes of the 'Donne Fotografe' edition by Contrasto publishing house. The photographers are organized into three groups depending on the decades: pioneer (1851-1936), revolutionary (1937-1970) and visionary (1970-2010). The pioneering period saw the opening to endless possibilities even if the career of photographer can prove to be a path full of pitfalls for a woman. The revolutionaries will then succeed in breaking the traditional patterns through their representations that become a real battleground. Finally, visionaries open up to a new imaginary, placing themselves at the forefront and carving out a space in the constantly evolving photography.",
    "Originally women photographers were mostly Western and operated in countries where photographic companies, clubs and publications take roots, such as the United States, Germany, France and the United Kingdom. These countries are not only the cradle of the first companies of photographic material, such as Kodak in the United States and Zeiss in Germany, but they are the geographical places where women manage to emancipate first and establish themselves in artistic fields such as photography.",
    "How have the parallel occupations of photographers changed over the decades? Many photographers are in fact multifaceted artists ranging from painting to literature, from architecture to cinema and media arts, while others have parallel occupations in the non-art field. A division has been made between occupations in the artistic field and not, therefore we will have two different data visualizations.",
    "What have been the most widespread parallel occupations in the United States, France, Germany and the United Kingdom? The four countries with the highest number of female photographers in the entire dataset and the thirteen most widespread and relevant occupations were selected. It is interesting to note the trends and contextualize them to the socio-cultural scenario of the countries. The reading of this path can be combined with the third view that historically frames the parallel occupations."
  ]

  for (let i=0; i<textFooter.length; i++) {
    let actDiv = document.createElement("div");
    let actH2 = document.createElement("h2");
    let actA = document.createElement("a");
    let actImg = document.createElement("img");
    let actText = document.createElement("p")

    actImg.src = "./question-" + String(i+1) + "/cover" + String(i+1) + ".jpg";
    actImg.style.width = "30%";
    actImg.style.float = "left";

    actText.innerHTML = textFooterDescriptions[i];
    actText.style.marginLeft = "32%";
    actText.style.fontSize = "1.2rem";
    actText.style.lineHeight = "1.5";
    actText.style.textIndent = "1.2rem";

    actDiv.appendChild(actH2);
    actH2.appendChild(actA);
    actDiv.appendChild(actImg);
    actDiv.appendChild(actText);

    actA.innerHTML = String(i+1) + '. ' + textFooter[i];
    actA.href = "./question-" + String(i+1) + "/";

    footer.appendChild(actDiv);
  }
  
});
