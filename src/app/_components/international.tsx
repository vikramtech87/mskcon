import Container from "@/components/container";
import React from "react";
import Faculty from "./faculty";
import HomeCta from "./home-cta";

const International = () => {
  return (
    <div className="bg-slate-100">
      <Container>
        <div className="py-8 sm:py-12 space-y-4 sm:space-y-8 text-center">
          <h2 className="text-3xl sm:text-4xl">International faculties</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-4 gap-x-2">
            <Faculty
              imageUrl="/images/faculties/int1.jpg"
              name="John doe"
              info="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              isDark={true}
            />
            <Faculty
              imageUrl="/images/faculties/int2.jpg"
              name="John doe"
              info="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              isDark={true}
            />
            <Faculty
              imageUrl="/images/faculties/int3.jpg"
              name="John doe"
              info="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              isDark={true}
            />
            <Faculty
              imageUrl="/images/faculties/int4.jpg"
              name="John doe"
              info="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              isDark={true}
            />
            <Faculty
              imageUrl="/images/faculties/int5.jpg"
              name="John doe"
              info="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              isDark={true}
            />
            <Faculty
              imageUrl="/images/faculties/int6.jpg"
              name="John doe"
              info="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              isDark={true}
            />
          </div>
          <HomeCta />
        </div>
      </Container>
    </div>
  );
};

export default International;
