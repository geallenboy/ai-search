// /src/utils/computeSimilarity.ts
import cosineSimilarity from "compute-cosine-similarity";
import dot from "compute-dot";


const computeSimilarity = (x: number[], y: number[]): number => {
  const similarityMeasure = "cosine"
  if (similarityMeasure === "cosine") {
    return cosineSimilarity(x, y);
  } else if (similarityMeasure === "dot") {
    return dot(x, y);
  }

  throw new Error("Invalid similarity measure");
};

export default computeSimilarity;
