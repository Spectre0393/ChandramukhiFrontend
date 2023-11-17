import React, { useState, useEffect } from "react";
import "../../../utils/css/cardcarousel.css";

import FinanceCard from "./FinanceCard";
// import { financesData } from "../../../utils/data";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

const FinanceCardCarousel = () => {
  const [allFinancesData, setAllFinancesData] = useState([]);
  const [loading, setLoading] = useState(false);
  //fetch all finances list start
  useEffect(() => {
    const allFinances = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/all-finances-list"
        );
        setAllFinancesData(response?.data.data);
        setLoading(true);
      } catch (err) {
        console.log(err);
      }
    };
    allFinances();
  }, []);
  //fetch all finances list end

  // card slider design start
  const [currentIndexes, setCurrentIndexes] = useState([0, 1, 2, 3]);
  const [displayFinanceData, setDisplayFinanceData] = useState(
    currentIndexes.map((e) => allFinancesData[e])
  );

  function nextCards() {
    let indexes = [];
    const totalFinances = allFinancesData.length;
    currentIndexes.map((position, index) => {
      if (position === totalFinances - 1) {
        return indexes.push((position = 0));
      } else {
        return indexes.push(position + 1);
      }
    });
    setCurrentIndexes(indexes);
    setDisplayFinanceData(indexes.map((e) => allFinancesData[e]));
    console.log();
  }

  function prevCards() {
    let indexes = [];
    const totalFinances = allFinancesData.length;
    currentIndexes.map((position, index) => {
      if (position === 0) {
        return indexes.push((position = totalFinances - 1));
      } else {
        return indexes.push(position - 1);
      }
    });
    setCurrentIndexes(indexes);
    setDisplayFinanceData(indexes.map((e) => allFinancesData[e]));
  }

  // card slider design end

  return (
    <div className="carousel-container">
      <FontAwesomeIcon
        className="leftBtn"
        icon={faChevronLeft}
        onClick={() => prevCards()}
      />

      {loading &&
        displayFinanceData?.map((finances, index) => {
          return <FinanceCard key={index} {...finances} />;
        })}

      <FontAwesomeIcon
        className="rightBtn"
        icon={faChevronRight}
        onClick={() => nextCards()}
      />
    </div>
  );
};

export default FinanceCardCarousel;