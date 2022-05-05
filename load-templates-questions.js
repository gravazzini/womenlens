const questionsNavigation = d3.select("#questions-navigation");
if (questionsNavigation.size() > 0) {
  Promise.all([d3.text("../questions.yml")]).then(([questionsData]) => {
    questionsData = jsyaml.load(questionsData);
    questionsNavigation
      .append("a")
      .style("padding", "0 1rem")
      .attr("href", "../")
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
      .attr("href", (d) => "../" + d.folder)
      .text((d) => d.title);

    questionsList.select(".navigation-handler").on("click", function () {
      console.log("click");
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
      d3.text('../info.yml')
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

      let text = "Project by";

      footerAuthors
        .append("h5")
        .text(text);

      footerAuthors
        .selectAll("p")
        .data(info.authors)
        .join("p")
        .text(d => d.name);

    })
}