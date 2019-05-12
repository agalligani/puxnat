import _ from "lodash";

const emptyGrid = (x, y) => {
  let gridSize = { cols: x, rows: y };
  let gridLength = x * y;
  let gridBody = _.range(gridLength).map(() => {
    return "";
  });

  let gridNums = _.range(gridLength).map(() => {
    return 0;
  });

  let gridMeta = {
    acrossmap: null,
    admin: false,
    answers: {
      across: [],
      down: []
    },
    author: null,
    autowrap: null,
    bbars: null,
    circles: null,
    clues: {
      across: [],
      down: []
    },
    code: null,
    copyright: "",
    date: "",
    dow: "",
    downmap: null,
    editor: "",
    grid: gridBody,
    gridnums: gridNums,
    hold: null,
    id: null,
    id2: null,
    interpretcolors: null,
    jnotes: null,
    key: null,
    mini: null,
    notepad: null,
    publisher: null,
    rbars: null,
    shadecircles: null,
    size: { cols: x, rows: y },
    title: null,
    track: null,
    type: null
  };
  return gridMeta;
};

export default emptyGrid;
