"use client";

import PageContainer from "@/components/page-container";
import WithAuth, { WithAuthProps } from "@/hooks/withAuth";
import React from "react";

type PostersPageProps = {} & WithAuthProps;

const PostersPage = () => {
  return (
    <PageContainer title="Guidelines for abstract submission">
      <ul className="list-decimal list-inside flex flex-col space-y-4">
        <li>
          Post–graduate (MD/ DNB) and super specialty (DM) students, senior
          residents and practicing consultants are eligible for submission of
          abstracts.
        </li>
        <li>
          Registration for the main conference is mandatory for abstract
          submission.
        </li>
        <li>
          Each participant can submit more than 1 abstract; however, only 1
          abstract per participant will be accepted for paper and/or poster
          category.
        </li>
        <li>
          The abstract must provide an informative summary of the research work
          and should be strictly on the subject/topic pertaining to Bone and
          soft tissue Oncopathology.
        </li>
        <li>
          The participants can present original research, case series and case
          reports. By default, case reports will be accepted as posters only.
        </li>
        <li>The paper/poster should not have been published.</li>
        <li>
          It is the responsibility of the authors to ensure the originality of
          the content submitted.
        </li>
        <li>
          All abstracts and full paper should be submitted only through the
          Email (<strong>posters.bstp2024@gmail.com</strong>).
        </li>
        <li>
          The last date for submission of abstracts is{" "}
          <strong>
            7<sup>th</sup> October, 2024
          </strong>
          .
        </li>
        <li>
          Abstracts will be reviewed and participants will be informed about the
          category (paper/poster) by email, for offline presentation only.
        </li>
        <li>
          The abstract for the poster/paper should be structured with the
          following details [Maximum word limit of 300 (excluding spaces)]
          <ul className="list-disc list-inside flex flex-col space-y-1">
            <li>
              Title of the paper/poster [Maximum word limit for the abstract
              title is 15 (excluding spaces)].
            </li>
            <li>
              Name and affiliation of each author (Underline the name of the
              first and presenting author)
            </li>
            <li>Introduction</li>
            <li>Aim and Objectives</li>
            <li>Methods</li>
            <li>Results</li>
            <li>Conclusion</li>
          </ul>
        </li>
        <li>
          Only word files to be uploaded. The abstract should be typed in Times
          New Roman 12. Only title to be in bold.
        </li>
        <li>
          Certification: Participation certificates will be issued to all the
          participants and separate winner certificate/ prizes will also be
          awarded.
        </li>{" "}
        <li>
          For Any Queries kindly contact:{" "}
          <strong>posters.bstp2024@gmail.com</strong>.
        </li>
      </ul>
    </PageContainer>
  );
};

export default WithAuth(PostersPage);
