import * as d3 from "d3";

d3
  .select("body")
  .append("div")
  .html("Hola");

d3
  .queue()
  .defer(d3.json, "110m.json")
  .await(() => {
    console.log("data!");
  });

d3
  .queue()
  .defer(d3.json, "continentes.aset.json")
  .await((err, set) => {
    console.log(set);
  });
