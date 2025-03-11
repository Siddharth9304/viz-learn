import React, { useState, useEffect } from "react";
import * as d3 from "d3";

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    this.root = this._insert(this.root, value);
  }

  _insert(root, value) {
    if (!root) return new Node(value);
    if (value < root.value) root.left = this._insert(root.left, value);
    else root.right = this._insert(root.right, value);
    return root;
  }
}

const BSTVisualizer = () => {
  const [bst, setBst] = useState(new BST());
  const [values, setValues] = useState([]);

  const insertNode = () => {
    const newValue = Math.floor(Math.random() * 100);
    bst.insert(newValue);
    setValues([...values, newValue]);
    visualizeBST();
  };

  const visualizeBST = () => {
    d3.select("#bst-svg").selectAll("*").remove();
    const svg = d3.select("#bst-svg")
      .attr("width", 600)
      .attr("height", 400);

    const drawTree = (node, x, y, level) => {
      if (!node) return;
      svg.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 20)
        .style("fill", "lightblue")
        .style("stroke", "black");

      svg.append("text")
        .attr("x", x)
        .attr("y", y + 5)
        .attr("text-anchor", "middle")
        .text(node.value);

      if (node.left) {
        svg.append("line")
          .attr("x1", x)
          .attr("y1", y)
          .attr("x2", x - 50)
          .attr("y2", y + 50)
          .style("stroke", "black");
        drawTree(node.left, x - 50, y + 50, level + 1);
      }

      if (node.right) {
        svg.append("line")
          .attr("x1", x)
          .attr("y1", y)
          .attr("x2", x + 50)
          .attr("y2", y + 50)
          .style("stroke", "black");
        drawTree(node.right, x + 50, y + 50, level + 1);
      }
    };

    drawTree(bst.root, 300, 50, 1);
  };

  useEffect(() => {
    visualizeBST();
  }, [values]);

  return (
    <div>
      <h2>Binary Search Tree Visualization</h2>
      <button onClick={insertNode}>Insert Random Node</button>
      <svg id="bst-svg"></svg>
    </div>
  );
};

export default BSTVisualizer;
