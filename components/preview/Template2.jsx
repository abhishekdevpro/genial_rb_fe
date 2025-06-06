// import React, { useContext, useRef } from "react";
// // import { ResumeContext } from "../../pages/builder";
// import { HighlightMenu } from "react-highlight-menu";
// import Image from "next/image";
// import Link from "next/link";
// import { CgWebsite } from "react-icons/cg";
// import {
//   FaGithub,
//   FaLinkedin,
//   FaTwitter,
//   FaFacebook,
//   FaInstagram,
//   FaYoutube,
//   FaBold,
//   FaItalic,
//   FaPlus,
//   FaMinus,
//   FaAlignLeft,
//   FaAlignCenter,
//   FaAlignRight,
//   FaLink,
//   FaUnderline,
// } from "react-icons/fa";
// import dynamic from "next/dynamic";
// import { ResumeContext } from "../context/ResumeContext";
// import EducationSection from "./Education";

// const DragDropContext = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.DragDropContext), { ssr: false });
// const Droppable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Droppable), { ssr: false });
// const Draggable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Draggable), { ssr: false });

// const Template1 = () => {
//   const { resumeData, headerColor, backgroundColorss } = useContext(ResumeContext);
//   console.log(headerColor,backgroundColorss,">>>");
//   const templateRef = useRef(null);

//   const extractHtml = () => {
//     const htmlContent = templateRef.current?.outerHTML;
//     console.log(htmlContent);
//     return htmlContent;
// };
//   const icons = [
//     { name: "github", icon: <FaGithub /> },
//     { name: "linkedin", icon: <FaLinkedin /> },
//     { name: "twitter", icon: <FaTwitter /> },
//     { name: "facebook", icon: <FaFacebook /> },
//     { name: "instagram", icon: <FaInstagram /> },
//     { name: "youtube", icon: <FaYoutube /> },
//     { name: "website", icon: <CgWebsite /> },
//   ];

//   const MenuButton = ({ title, icon, onClick }) => (
//     <button
//       onClick={onClick}
//       title={title}
//       className="flex items-center justify-center p-3 hover:bg-gray-200 rounded text-lg font-semibold"
//     >
//       {icon}
//     </button>
//   );

//   return (
//     <div ref={templateRef} className="max-w-4xl mx-auto bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
//       <div className="flex flex-col mb-4">
//         {resumeData.profilePicture.length > 0 && (
//           <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-black">
//             <Image
//               src={resumeData.profilePicture}
//               alt="profile"
//               width={100}
//               height={100}
//               className="object-cover w-full h-full"
//             />
//           </div>
//         )}
//         <h1 className="text-2xl font-bold" style={{ color: headerColor }}>{resumeData.name}</h1>
//         <p className="text-lg text-gray-700">{resumeData.position}</p>

//         <div className="flex flex-col gap-1 text-gray-600">
//           <p>Phone: {resumeData.contactInformation}</p>
//           <p>Email: {resumeData.email}</p>
//         </div>

//         <div className="grid grid-cols-1 gap-1">
//           {resumeData.socialMedia.map((socialMedia, index) => (
//             <a
//               href={`https://${socialMedia.link}`}
//               key={index}
//               title={socialMedia.socialMedia}
//               target="_blank"
//               rel="noreferrer"
//               className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900"
//             >
//               {icons.find(icon => icon.name === socialMedia.socialMedia.toLowerCase())?.icon}
//               {socialMedia.link}
//             </a>
//           ))}
//         </div>
//       </div>

//       <hr className="border-dashed my-4" />

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="col-span-1 space-y-4" style={{ backgroundColor: backgroundColorss }}>
//           {resumeData.summary.length > 0 && (
//             <div className="mb-4">
//               <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2" style={{ color: headerColor }}>
//                 Summary
//               </h2>
//               <p className="text-gray-700 border-l-4 border-gray-800 p-2 bg-gray-100 transition-transform duration-300 hover:scale-105"
//                 contentEditable="true"
//                 suppressContentEditableWarning={true}
//               >
//                 {resumeData.summary}
//               </p>
//             </div>
//           )}

//           {resumeData.education.length > 0 && (
//             <div className="mb-4">
//               <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2" style={{ color: headerColor }}>
//                 Education
//               </h2>
//               {resumeData.education.map((item, index) => (
//                 <div key={index} className="border-l-4 border-gray-800 bg-gray-100 p-3">
//                   <p className="font-semibold">{item.degree}</p>
//                   <p>{item.school}</p>
//                   <p className="text-gray-600">{`${item.startYear} - ${item.endYear}`}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//                  <EducationSection
//         educationData={resumeData?.education}

//       />

//           <Droppable droppableId="skills" type="SKILLS">
//             {(provided) => (
//               <div {...provided.droppableProps} ref={provided.innerRef}>
//                 {resumeData.skills.map((skill, index) => (
//                   <Draggable
//                     key={`SKILLS-${index}`}
//                     draggableId={`SKILLS-${index}`}
//                     index={index}
//                   >
//                     {(provided, snapshot) => (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         className={`transition-transform duration-300 hover:scale-105 mb-4 ${
//                           snapshot.isDragging ? "outline-dashed outline-2 outline-gray-400 bg-white" : ""
//                         }`}
//                       >
//                         {skill.skills.length > 0 && (
//                           <>
//                             <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2"
//                                 contentEditable
//                                 suppressContentEditableWarning>
//                               {skill.title}
//                             </h2>
//                             <p className="text-gray-700 border-l-4 border-gray-800 p-2 bg-gray-100">
//                               {skill.skills.join(", ")}
//                             </p>
//                           </>
//                         )}
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>

//           {resumeData.languages.length > 0 && (
//             <div className="mb-4">
//               <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2" style={{ color: headerColor }}>
//                 Languages
//               </h2>
//               <p className="text-gray-700 border-l-4 border-gray-800 p-2 bg-gray-100">
//                 {resumeData.languages.join(", ")}
//               </p>
//             </div>
//           )}

//           {resumeData.certifications.length > 0 && (
//             <div className="mb-4">
//               <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2" style={{ color: headerColor }}>
//                 Certifications
//               </h2>
//               <ul className="list-disc pl-6 text-gray-700 border-l-4 border-gray-800 p-2 bg-gray-100">
//                 {resumeData.certifications.map((certification, index) => (
//                   <li key={index}>{certification}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>

//         <div className="col-span-2 space-y-4">
//           {resumeData.workExperience.length > 0 && (
//             <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
//               {(provided) => (
//                 <div {...provided.droppableProps} ref={provided.innerRef}>
//                   <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2"
//                       contentEditable
//                       suppressContentEditableWarning
//                       style={{ color: headerColor }}>
//                     Work Experience
//                   </h2>
//                   {resumeData.workExperience.map((item, index) => (
//                     <Draggable
//                       key={`${item.company}-${index}`}
//                       draggableId={`WORK_EXPERIENCE-${index}`}
//                       index={index}
//                     >
//                       {(provided, snapshot) => (
//                         <div
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           className={`transition-transform duration-300 hover:scale-105 mb-4 border-l-4 border-gray-800 p-2 bg-gray-100 ${
//                             snapshot.isDragging ? "outline-dashed outline-2 outline-gray-400 bg-white" : ""
//                           }`}
//                         >
//                           <div className="flex justify-between mb-2">
//                             <p className="font-semibold">{item.company}</p>
//                             <p className="text-gray-600">{`${item.startYear} - ${item.endYear}`}</p>
//                           </div>
//                           <p className="text-gray-800">{item.position}</p>
//                           <p className="text-gray-700 hyphens-auto hover:outline-dashed hover:outline-2 hover:outline-gray-400"
//                              contentEditable="true"
//                              suppressContentEditableWarning={true}>
//                             {item.description}
//                           </p>

//                           <Droppable
//                             droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
//                             type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
//                           >
//                             {(provided) => (
//                               <ul className="list-disc pl-6 mt-2"
//                                   {...provided.droppableProps}
//                                   ref={provided.innerRef}>
//                                 {typeof item.keyAchievements === "string" &&
//                                   item.keyAchievements.split("\n").map((achievement, subIndex) => (
//                                     <Draggable
//                                       key={`${item.company}-${index}-${subIndex}`}
//                                       draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
//                                       index={subIndex}
//                                     >
//                                       {(provided, snapshot) => (
//                                         <li
//                                           ref={provided.innerRef}
//                                           {...provided.draggableProps}
//                                           {...provided.dragHandleProps}
//                                           className={`transition-transform duration-300 hover:scale-105 hover:outline-dashed hover:outline-2 hover:outline-gray-400 ${
//                                             snapshot.isDragging ? "outline-dashed outline-2 outline-gray-400 bg-white" : ""
//                                           }`}
//                                         >
//                                           <div
//                                             dangerouslySetInnerHTML={{ __html: achievement }}
//                                             contentEditable
//                                           />
//                                         </li>
//                                       )}
//                                     </Draggable>
//                                   ))}
//                                 {provided.placeholder}
//                               </ul>
//                             )}
//                           </Droppable>
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           )}

//           {resumeData.projects.length > 0 && (
//             <Droppable droppableId="projects" type="PROJECTS">
//               {(provided) => (
//                 <div {...provided.droppableProps} ref={provided.innerRef}>
//                   <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2"
//                       contentEditable
//                       suppressContentEditableWarning
//                       style={{ color: headerColor }}>
//                     Projects
//                   </h2>
//                   {resumeData.projects.map((item, index) => (
//                     <Draggable
//                       key={`${item.name}-${index}`}
//                       draggableId={`PROJECTS-${index}`}
//                       index={index}
//                     >
//                       {(provided, snapshot) => (
//                         <div
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           className={`transition-transform duration-300 hover:scale-105 mb-4 border-l-4 border-gray-800 p-2 bg-gray-100 ${
//                             snapshot.isDragging ? "outline-dashed outline-2 outline-gray-400 bg-white" : ""
//                           }`}
//                         >
//                           <div className="flex justify-between mb-2">
//                             <p className="font-semibold">{item.name}</p>
//                             <p className="text-gray-600">{`${item.startYear} - ${item.endYear}`}</p>
//                           </div>

//                           <Link
//                             href={item.link}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-emerald-500 hover:underline"
//                           >
//                             {item.link}
//                           </Link>

//                           <p className="text-gray-700 mt-2">{item.description}</p>

//                           <Droppable
//                             droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
//                             type="PROJECTS_KEY_ACHIEVEMENT"
//                           >
//                             {(provided) => (
//                               <ul className="list-disc pl-6 mt-2"
//                                   {...provided.droppableProps}
//                                   ref={provided.innerRef}>
//                                 {typeof item.keyAchievements === "string" &&
//                                   item.keyAchievements.split("\n").map((achievement, subIndex) => (
//                                     <Draggable
//                                       key={`${item.name}-${index}-${subIndex}`}
//                                       draggableId={`PROJECTS_KEY_ACHIEVEMENT-${index}-${subIndex}`}
//                                       index={subIndex}
//                                     >
//                                       {(provided, snapshot) => (
//                                         <li
//                                           ref={provided.innerRef}
//                                           {...provided.draggableProps}
//                                           {...provided.dragHandleProps}
//                                           className={`transition-transform duration-300 hover:scale-105 hover:outline-dashed hover:outline-2 hover:outline-gray-400 ${
//                                             snapshot.isDragging ? "outline-dashed outline-2 outline-gray-400 bg-white" : ""
//                                           }`}
//                                         >
//                                           <div
//                                             dangerouslySetInnerHTML={{ __html: achievement }}
//                                             contentEditable
//                                           />
//                                         </li>
//                                       )}
//                                     </Draggable>
//                                   ))}
//                                 {provided.placeholder}
//                               </ul>
//                             )}
//                           </Droppable>
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           )}
//         </div>
//       </div>

//       <HighlightMenu
//         styles={{
//           borderColor: "#C026D3",
//           backgroundColor: "#C026D3",
//           boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.15)",
//           zIndex: 10,
//           borderRadius: "5px",
//           padding: "3px",
//         }}
//         target="body"
//         menu={() => (
//           <div className="flex space-x-1">
//             <MenuButton
//               title="Bold (Ctrl+B)"
//               icon={<FaBold />}
//               onClick={toggleBold}
//             />
//             <MenuButton
//               title="Italic (Ctrl+I)"
//               icon={<FaItalic />}
//               onClick={toggleItalic}
//             />
//             <MenuButton
//               title="Underline (Ctrl+U)"
//               icon={<FaUnderline />}
//               onClick={toggleUnderline}
//             />
//             <MenuButton
//               title="Increase Font Size"
//               icon={<FaPlus />}
//               onClick={() => changeFontSize(4)}
//             />
//             <MenuButton
//               title="Decrease Font Size"
//               icon={<FaMinus />}
//               onClick={() => changeFontSize(2)}
//             />
//             <MenuButton
//               title="Align Left"
//               icon={<FaAlignLeft />}
//               onClick={() => alignText('Left')}
//             />
//             <MenuButton
//               title="Align Center"
//               icon={<FaAlignCenter />}
//               onClick={() => alignText('Center')}
//             />
//             <MenuButton
//               title="Align Right"
//               icon={<FaAlignRight />}
//               onClick={() => alignText('Right')}
//             />
//             <MenuButton
//               title="Add Link"
//               icon={<FaLink />}
//               onClick={toggleLink}
//             />
//           </div>
//         )}
//       />
//       {/* <button onClick={extractHtml}>Log HTML Content</button> */}
//     </div>
//   );
// };

// const A4PageWrapper = ({ children }) => {
//   const alertA4Size = () => {
//     const preview = document.querySelector(".preview");
//     if (preview) {
//       const previewHeight = preview.offsetHeight;
//       console.log(previewHeight);
//       if (previewHeight > 1122) {
//         alert("A4 size exceeded");
//       }
//     } else {
//       console.error("Element with class 'preview' not found.");
//     }
//   };

//   return (
//     <div className="w-full p-5" onLoad={alertA4Size}>
//       {children}
//     </div>
//   );
// };

// export default Template1;

// import React from "react";
import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";
import { HighlightMenu } from "react-highlight-menu";
import ContactInfo from "./ContactInfo";
import { CgWebsite } from "react-icons/cg";
import DateRange from "../utility/DateRange";
import Language from "./Language";
import Skills from "./Skills";
import Certification from "./Certification";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaBold,
  FaItalic,
  FaPlus,
  FaMinus,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaLink,
  FaUnderline,
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone, MdPictureAsPdf } from "react-icons/md";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import EducationSection from "./Education";
import WorkExperience from "./WorkExperience";
import ProjectsSection from "./ProjectSection";
const html2pdf = dynamic(() => import("html2pdf.js"), { ssr: false });

// Importing draggable components dynamically
const DragDropContext = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
  { ssr: false }
);
const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
  { ssr: false }
);
const Draggable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
  { ssr: false }
);
const Template1 = () => {
  const { resumeData, setResumeData, headerColor, backgroundColorss } =
    useContext(ResumeContext);
  const icons = [
    { name: "github", icon: <FaGithub /> },
    { name: "linkedin", icon: <FaLinkedin /> },
    { name: "twitter", icon: <FaTwitter /> },
    { name: "facebook", icon: <FaFacebook /> },
    { name: "instagram", icon: <FaInstagram /> },
    { name: "youtube", icon: <FaYoutube /> },
    { name: "website", icon: <CgWebsite /> },
  ];
  const MenuButton = ({ title, icon, onClick }) => (
    <button
      onClick={onClick}
      title={title}
      className="flex items-center justify-center p-3 hover:bg-gray-200 rounded font-semibold text-lg"
    >
      {icon}
    </button>
  );

  const downloadPDF = async () => {
    const element = document.querySelector(".w");
    const html2pdfModule = (await import("html2pdf.js")).default; // Dynamically load the module in client-side

    html2pdfModule().from(element).save("resume.pdf");
  };
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
      {/* <HighlightMenu
        styles={{
          borderColor: "#C026D3",
          backgroundColor: "#C026D3",
          boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.15)",
          zIndex: 10,
          borderRadius: "5px",
          padding: "3px",
        }}
        target="body"
        menu={() => (
          <>
            <MenuButton
              title="Bold (Ctrl+B)"
              icon={<FaBold />}
              onClick={toggleBold}
            />
            <MenuButton
              title="Italic (Ctrl+I)"
              icon={<FaItalic />}
              onClick={toggleItalic}
            />
            <MenuButton
              title="Underline (Ctrl+U)"
              icon={<FaUnderline />}
              onClick={toggleUnderline}
            />
            <MenuButton
              title="Increase Font Size"
              icon={<FaPlus />}
              onClick={() => changeFontSize(4)}
            />
            <MenuButton
              title="Decrease Font Size"
              icon={<FaMinus />}
              onClick={() => changeFontSize(2)}
            />

            <MenuButton
              title="Align Left"
              icon={<FaAlignLeft />}
              onClick={() => alignText('Left')}
            />
            <MenuButton
              title="Align Center"
              icon={<FaAlignCenter />}
              onClick={() => alignText('Center')}
            />
            <MenuButton
              title="Align Right"
              icon={<FaAlignRight />}
              onClick={() => alignText('Right')}
            />
             <MenuButton className="mx-3"
          title="Add Link"
          icon={<FaLink />}
          onClick={toggleLink}
        />
          </>
        )}
      /> */}

      <div className="f-col  mb-1">
        {resumeData.profilePicture.length > 0 && (
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-black">
            <Image
              src={resumeData.profilePicture}
              alt="profile"
              width={100}
              height={100}
              className="object-cover h-full w-full"
            />
          </div>
        )}
        <h1 className="name" style={{ color: headerColor }}>
          {resumeData.name}
        </h1>
        <p className="profession">{resumeData.position}</p>
        <ContactInfo
          mainclass=" flex-col gap-1 mb-1 contact"
          linkclass=" gap-1"
          teldata={`Phone: ${resumeData.contactInformation}`}
          emaildata={`| Email: ${resumeData.email}`}
        />
        {/* <div className="grid grid-row-3 gap-1">
            {resumeData.socialMedia.map((socialMedia, index) => {
              return (
                <a
                  href={`http://${socialMedia.link}`}
                  aria-label={socialMedia.socialMedia}
                  key={index}
                  title={socialMedia.socialMedia}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex  gap-1 social-media align-center  "
                  // Prevent text overflowing, If the socialMedia.link string is longer than 32 characters, apply the wordWrap and display styles to this <a> tag.
                  // wordWrap: "break-word" breaks the text onto the next line if it's too long,
                  // display: "inline-block" is necessary for wordWrap to work on an inline element like <a>.
                >
                  {icons.map((icon, index) => {
                    if (icon.name === socialMedia.socialMedia.toLowerCase()) {
                      return <span key={index}>{icon.icon}</span>;
                    }
                  })}
                  {socialMedia.link}
                </a>
              );
            })}
          </div> */}
        <div className="grid grid-cols-3 gap-1">
          {Array.isArray(resumeData?.socialMedia) ? (
            resumeData.socialMedia.map((socialMedia, index) => {
              return (
                <a
                  href={`http://${socialMedia.link}`}
                  aria-label={socialMedia.socialMedia}
                  key={index}
                  title={socialMedia.socialMedia}
                  target="_blank"
                  rel="noreferrer"
                  className="lg:inline-flex items-center gap-1 social-media align-center justify-center"
                >
                  {/* Display icon and name */}
                  {icons.map((icon, idx) => {
                    if (icon.name === socialMedia.socialMedia.toLowerCase()) {
                      return (
                        <span key={idx} className="flex items-center gap-2">
                          {/* Icon */}
                          <span>{icon.icon}</span>
                          {/* Platform name */}
                          <span>{socialMedia.socialMedia}</span>
                        </span>
                      );
                    }
                  })}
                </a>
              );
            })
          ) : (
            <p>No social media links available</p> // Fallback content
          )}
        </div>
      </div>
      <hr className="border-dashed my-2" />
      {/* two column start */}
      <div className="">
        <div
          className="col-span-1 space-y-2"
          style={{ backgroundColor: backgroundColorss }}
        >
          {resumeData.summary.length > 0 && (
            <div className="mb-1">
              <h2
                className="section-title mb-1 border-b-2 border-gray-300"
                style={{ color: headerColor }}
              >
                Summary
              </h2>
              <p
                className="content break-words border-l-4 border-l-gray-800 p-2"
                style={{ background: "#eee" }}
                dangerouslySetInnerHTML={{
                  __html: resumeData.summary,
                }}
              />
              {/* {resumeData.summary} */}
              {/* </p> */}
            </div>
          )}
          <div>
            {/* {resumeData.education.length > 0 && (
                <div className="mb-1">
                  <h2
                    className="section-title mb-1 border-b-2 border-gray-300"
                    style={{ color: headerColor }}
                  >
                    Education
                  </h2>
                  {resumeData.education.map((item, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-l-gray-800 "
                      style={{ background: "#eee", padding: "10px" }}
                    >
                      <p className="content i-bold">{item.degree}</p>
                      <p className="content">{item.school}</p>
                      <DateRange
                        startYear={item.startYear}
                        endYear={item.endYear}
                        id={`education-start-end-date`}
                      />
                      <p className="content">{item.location}</p>
                    </div>
                  ))}
                </div>
              )} */}
            <h2
              className="section-title mb-1 border-b-2 border-gray-300"
              style={{ color: headerColor }}
            >
              Education
            </h2>
            <EducationSection
              className="border-l-4 border-l-gray-800 "
              itemClassNames={{
                school: "content",
                degree: "content i-bold",
                location: "sub-content",
              }}
              style={{ background: "#eee", padding: "10px" }}
              educationData={resumeData?.education}
            />
          </div>
          <Droppable droppableId="skills" type="SKILLS">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {resumeData.skills.map((skill, index) => (
                  <Draggable
                    key={`SKILLS-${index}`}
                    draggableId={`SKILLS-${index}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`hover:scale-105 transition-transform duration-300 mb-1  ${
                          snapshot.isDragging &&
                          "outline-dashed outline-2 outline-gray-400 bg-white "
                        }`}
                      >
                        {skill.skills.length > 0 && (
                          <>
                            <h2
                              className="section-title mb-1 border-b-2 border-gray-300 editable"
                              contentEditable
                              suppressContentEditableWarning
                            >
                              {skill.title}
                            </h2>
                            <p className="sub-content border-l-4 border-l-gray-800 p-2 bg-stone-200 my-2">
                              {skill.skills.join(", ")}
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {/* {resumeData.languages.length > 0 && (
              <div>
                <h2
                  className="section-title mb-1 border-b-2 border-gray-300"
                  title="lan"
                  style={{ color: headerColor }}
                >
                  Language
                </h2>
                <p className="sub-content border-l-4 border-l-gray-800 p-2 bg-stone-200 my-2">
                  {resumeData.languages.join(", ")}
                </p>
              </div>
            )} */}
          <Language
            itemClassNames={{
              language:
                "sub-content border-l-4 border-l-gray-800 p-2 bg-stone-200 my-2",
              title: "section-title mb-1 border-b-2 border-gray-300",
            }}
            title="Languages"
            languages={resumeData.languages}
          />
          {resumeData.certifications.length > 0 && (
            <div>
              <h2
                className="section-title mb-1 border-b-2 border-gray-300"
                style={{ color: headerColor }}
              >
                Certifications
              </h2>
              <ul className="sub-content border-l-4 border-l-gray-800 p-2 bg-stone-200 my-2 my-2">
                {resumeData.certifications.map((certification, index) => (
                  <li key={index}>{certification}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="col-span-2 space-y-2">
          <WorkExperience
            className="hover:scale-105 transition-transform duration-300 mb-1 border-l-4 border-l-gray-800 p-2 bg-stone-200 my-2"
            itemClassNames={{
              title: "section-title mb-1 border-b-2 border-gray-300 editable",
              company: "content i-bold",
              position: "content",
              location: "sub-content",
              content:
                "hover:scale-105 transition-transform duration-300 mb-1 border-l-4 border-l-gray-800 p-2 bg-stone-200 my-2",
            }}
            resumeData={resumeData}
            headerColor={headerColor}
          />
          <ProjectsSection resumeData={resumeData} headerColor={headerColor} />

          {resumeData.projects.length > 0 && (
            <Droppable droppableId="projects" type="PROJECTS">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <h2
                    className="section-title mb-1 border-b-2 border-gray-300 editable"
                    contentEditable
                    suppressContentEditableWarning
                    style={{ color: headerColor }}
                  >
                    Projects
                  </h2>
                  {resumeData.projects.map((item, index) => (
                    <Draggable
                      key={`${item.name}-${index}`}
                      draggableId={`PROJECTS-${index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`hover:scale-105 transition-transform duration-300 mb-1 border-l-4 border-l-gray-800 p-2 bg-stone-200 my-2 ${
                            snapshot.isDragging &&
                            "outline-dashed outline-2 outline-gray-400 bg-white"
                          }`}
                        >
                          <div className="flex flex-row justify-between space-y-1">
                            <p className="content i-bold">{item.name}</p>
                            <DateRange
                              startYear={item.startYear}
                              endYear={item.endYear}
                              id={`work-experience-start-end-date`}
                            />
                          </div>

                          <Link
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="content"
                          >
                            {item.link}
                          </Link>
                          <p
                            className="content"
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          />
                          {/* {item.description}</p> */}
                          <Droppable
                            droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
                            type="PROJECTS_KEY_ACHIEVEMENT"
                          >
                            {(provided) => (
                              <ul
                                className="list-disc ul-padding content"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                              >
                                {typeof item.keyAchievements === "string" &&
                                  item.keyAchievements
                                    .split("\n")
                                    .map((achievement, subIndex) => (
                                      <Draggable
                                        key={`${item.name}-${index}-${subIndex}`}
                                        draggableId={`PROJECTS_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                        index={subIndex}
                                      >
                                        {(provided, snapshot) => (
                                          <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={`
                                    hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                    ${
                                      snapshot.isDragging &&
                                      "outline-dashed outline-2 outline-gray-400 bg-white"
                                    }`}
                                          >
                                            <div
                                              dangerouslySetInnerHTML={{
                                                __html: achievement,
                                              }}
                                              contentEditable
                                            />
                                          </li>
                                        )}
                                      </Draggable>
                                    ))}
                                {provided.placeholder}
                              </ul>
                            )}
                          </Droppable>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </div>
      </div>
    </div>
  );
};

const A4PageWrapper = ({ children }) => {
  const alertA4Size = () => {
    const preview = document.querySelector(".preview");
    if (preview) {
      const previewHeight = preview.offsetHeight;
      console.log(previewHeight);
      if (previewHeight > 1122) {
        alert("A4 size exceeded");
      }
    } else {
      console.error("Element with class 'preview' not found.");
    }
  };

  return (
    <div className="w p-5" onLoad={alertA4Size}>
      {children}
    </div>
  );
};

export default Template1;
