import React, { useRef, useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { downloadExcel } from "react-export-table-to-excel";
var results,
  conditionalData = [{}];

createTheme(
  "solarized",
  {
    text: {
      primary: "#268bd2",
      secondary: "#2aa198",
    },
    background: {
      default: "#002b36",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "#073642",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  },
  "dark"
);

function filterResults(results) {
  let filteredResults = [];
  function addItemToUniqueArray(item, array) {
    // Check if an item with the same id already exists in the array
    const existingItem = array.find(
      (existing) => existing.decodedText === item.decodedText
    );

    // If the item doesn't exist, add it to the array
    if (!existingItem) {
      array.push(item);
    }
  }
  for (var i = 0; i < results.length; ++i) {
    addItemToUniqueArray(results[i], filteredResults);
  }

  return filteredResults;
}
const ResultContainerTable = ({ data }) => {
  results = filterResults(data);
  let string = JSON.stringify(results);
  var todoList = JSON.parse(localStorage.getItem("dataForTable"));

  useEffect(() => {
    if (string.length > 2) {
      localStorage.setItem("dataForTable", string);
    }
  }, [string]);
  const tableRef = useRef(null);
  const header = ["Panel ID"];
  if (todoList?.length > 0) {
    conditionalData = todoList;
  } else {
    conditionalData = results;
  }
  function handleDownloadExcel() {
    downloadExcel({
      fileName: "PanelID's",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header,
        body: conditionalData,
      },
    });
    localStorage.removeItem("dataForTable");
  }

  const buttonStyle = {
    backgroundColor: "#2979ff",
    border: "none",
    color: "white",
    padding: "8px 11px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "10px",
    borderRadius: "3px",
    cursor: "pointer",
  };

  const hoverStyle = {
    cursor: "pointer",
  };
  // eslint-disable-next-line react/prop-types
  const Export = () => (
    <button style={buttonStyle} onClick={handleDownloadExcel}>
      Export
    </button>
  );

  const columns = [
    { name: "Panel ID", selector: (row) => row.decodedText, width: 480 },
  ];
  const actionsMemo = React.useMemo(() => <Export />, []);

  return (
    <div className="container-xs">
      <DataTable
        ref={tableRef}
        columns={columns}
        data={conditionalData}
        direction="auto"
        fixedHeader
        fixedHeaderScrollHeight="300px"
        highlightOnHover
        pagination
        responsive
        subHeaderAlign="right"
        subHeaderWrap
        theme="solarized"
        actions={actionsMemo}
      ></DataTable>
    </div>
  );
};

const ResultContainerPlugin = (props) => {
  const results = filterResults(props.results);
  var todoList = JSON.parse(localStorage.getItem("dataForTable")) || [];

  return (
    <div className="Result-container">
      <div className="Result-header">Scanned results ({todoList.length})</div>
      <div className="Result-section">
        <ResultContainerTable data={results} />
      </div>
    </div>
  );
};

export default ResultContainerPlugin;
