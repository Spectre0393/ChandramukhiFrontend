import React, { useState, useEffect } from "react";
import "../../../utils/css/cardcarousel.css";

import CreditorsCard from "./CreditorsCard";
// import { creditorsData } from "../../../utils/data";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

const CreditorsCardCarousel = () => {
  const [allCreditorsData, setAllCreditorsData] = useState([]);
  const [loading, setLoading] = useState(false);
  //fetch all creditors list start
  useEffect(() => {
    const allCreditors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/all-creditors-list"
        );
        setAllCreditorsData(response?.data.data);
        setLoading(true);
      } catch (err) {
        console.log(err);
      }
    };
    allCreditors();
  }, []);
  //fetch all creditors list end


  const [currentIndexes, setCurrentIndexes] = useState([0, 1, 2, 3]);
  const [displayCreditorsData, setDisplayCreditorsData] = useState(
    currentIndexes.map((e) => allCreditorsData[e])
  );

  function nextCards() {
    let indexes = [];
    currentIndexes.map((position, index) => {
      if (position === 7) {
        return indexes.push((position = 0));
      } else {
        return indexes.push(position + 1);
      }
    });
    console.log(indexes);
    setCurrentIndexes(indexes);
    setDisplayCreditorsData(indexes.map((e) => allCreditorsData[e]));
  }

  function prevCards() {
    let indexes = [];
    currentIndexes.map((position, index) => {
      if (position === 0) {
        return indexes.push((position = 7));
      } else {
        return indexes.push(position - 1);
      }
    });
    setCurrentIndexes(indexes);
    setDisplayCreditorsData(indexes.map((e) => allCreditorsData[e]));
  }

  return (
    <div className="carousel-container">
      <FontAwesomeIcon
        className="leftBtn"
        icon={faChevronLeft}
        onClick={() => prevCards()}
      />

      {loading &&
        displayCreditorsData?.map((creditors, index) => {
          return <CreditorsCard key={index} {...creditors} />;
        })}

      <FontAwesomeIcon
        className="rightBtn"
        icon={faChevronRight}
        onClick={() => nextCards()}
      />
    </div>
  );
};

export default CreditorsCardCarousel;