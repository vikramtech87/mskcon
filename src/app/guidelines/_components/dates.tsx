import React from "react";
import DItem from "./ditem";
import Dt from "./dt";
import Dd from "./dd";

const Dates = () => {
  return (
    <section>
      <h3 className="text-xl font-medium">Important Dates</h3>
      <div className="">
        <dl className="divide-y divide-y-gray-100">
          <DItem>
            <Dt>Last date for early bird registration</Dt>
            <Dd>October 31</Dd>
          </DItem>
          <DItem>
            <Dt>Last date for asbtract submission</Dt>
            <Dd>November 7</Dd>
          </DItem>
          <DItem>
            <Dt>Last date for online registration</Dt>
            <Dd>November 30</Dd>
          </DItem>
          <DItem>
            <Dt>Spot registration available</Dt>
            <Dd>December 6</Dd>
          </DItem>
        </dl>
      </div>
    </section>
  );
};

export default Dates;
