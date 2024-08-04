import Container from "@/components/container";
import React from "react";
import Faculty from "./faculty";
import HomeCta from "./home-cta";

const National = () => {
  return (
    <Container>
      <div className="py-8 sm:py-12 space-y-4 sm:space-y-8 text-center">
        <h2 className="text-3xl sm:text-4xl">National faculties</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-4 gap-x-2">
          <Faculty
            imageUrl="/images/faculties/nat1.jpg"
            name="John doe"
            info="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            isDark={false}
          />
          <Faculty
            imageUrl="/images/faculties/nat2.jpg"
            name="John doe"
            info="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            isDark={false}
          />
          <Faculty
            imageUrl="/images/faculties/nat3.jpg"
            name="John doe"
            info="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            isDark={false}
          />
          <Faculty
            imageUrl="/images/faculties/nat4.jpg"
            name="John doe"
            info="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            isDark={false}
          />
          <Faculty
            imageUrl="/images/faculties/nat5.jpg"
            name="John doe"
            info="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            isDark={false}
          />
          <Faculty
            imageUrl="/images/faculties/nat6.jpg"
            name="John doe"
            info="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            isDark={false}
          />
          <Faculty
            imageUrl="/images/faculties/nat7.jpg"
            name="John doe"
            info="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            isDark={false}
          />
          <Faculty
            imageUrl="/images/faculties/nat8.jpg"
            name="John doe"
            info="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            isDark={false}
          />
          <Faculty
            imageUrl="/images/faculties/int7.jpg"
            name="John doe"
            info="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            isDark={false}
          />
          <Faculty
            imageUrl="/images/faculties/int8.jpg"
            name="John doe"
            info="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            isDark={false}
          />
        </div>
        <HomeCta />
      </div>
    </Container>
  );
};

export default National;
