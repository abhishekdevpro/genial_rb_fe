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
// import Image from "next/image";
import Link from "next/link";
import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaFacebook,
    FaInstagram,
    FaYoutube, FaBold, FaItalic, FaPlus, FaMinus, FaAlignLeft, FaAlignCenter, FaAlignRight, FaLink,
    FaUnderline,
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import dynamic from "next/dynamic";
// Importing draggable components dynamically
const DragDropContext = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.DragDropContext), { ssr: false });
const Droppable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Droppable), { ssr: false });
const Draggable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Draggable), { ssr: false })
const Template25 = () => {
    const { resumeData, setResumeData, headerColor } = useContext(ResumeContext);
    const icons = [
        { name: "github", icon: <FaGithub /> },
        { name: "linkedin", icon: <FaLinkedin /> },
        { name: "twitter", icon: <FaTwitter /> },
        { name: "facebook", icon: <FaFacebook /> },
        { name: "instagram", icon: <FaInstagram /> },
        { name: "youtube", icon: <FaYoutube /> },
        { name: "website", icon: <CgWebsite /> },
    ];

    return (
        <div className="max-w-3xl mx-auto p-5 bg-amber-50 shadow-md border-solid border-2 border-black mb-5 rounded-lg">
        <div class="text-left text-black w-full p-5">
            <div className="mb-8">
              {/* <h2 className="text-xl text-black font-bold mb-2" style={{ color: headerColor }}>CONTACT</h2> */}
              <ContactInfo
                    mainclass=" gap-1 flex justify-evenly	 mb-1 text-black font-light mb-5 contact"
                    linkclass="inline-flex items-center gap-1"
                    teldata={resumeData.contactInformation}
                    emaildata={resumeData.email}
                    addressdata={resumeData.address}
                    telicon={<MdPhone />}
                    emailicon={<MdEmail />}
                    addressicon={<MdLocationOn />}
                  />
            </div>
        </div>  
        <div class="flex gap-2 items-start ">
            <div class="w-2/3 text-left">
              {/* <h1 className="text-8xl text-black font-bold uppercase mb-4" style={{ color: headerColor }}>Resume</h1> */}
              <div className="mb-8 pt-2.5	flex justify-between">    
                  <h1 className="text-2xl text-black font-bold mb-4" style={{ color: headerColor }}>{resumeData.name}</h1>
                  <h2 className="text-2xl text-black tracking-wide uppercase font-light mb-4" style={{ color: headerColor }}>{resumeData.position}</h2>
              </div>
              <div className="mb-5">
                  <h2 className="text-xl font-bold mb-4 text-black" style={{ color: headerColor }}>ABOUT ME</h2>
                  <p class="text-black font-light hover:outline-dashed hover:outline-2 hover:outline-gray-400"
                  contentEditable="true"
                  suppressContentEditableWarning={true}
                  >
                    {resumeData.summary}
                  </p>
              </div>
            </div>
            <div class="mb-5 w-1/3">
            <img src={resumeData.profilePicture ? resumeData.profilePicture : "img/profile_one.png"} alt="Profile" />

            </div>
        </div>
        <div class="flex gap-2 items-start justify-between">
            <div class="p-5 w-1/2">
                <div class="mb-5">
                  <h2 className="text-xl font-bold mb-4 text-black" style={{ color: headerColor }}>EXPERIENCE</h2>
                  <div>
                    <h3 className="text-xl text-black font-semibold pb-2 mb-4" style={{ color: headerColor }}>Projects</h3>
                    {resumeData.workExperience.length > 0 && (
                            <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
                              {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                
                                  {resumeData.workExperience.map((item, index) => (
                                    <Draggable
                                      key={`${item.company}-${index}`}
                                      draggableId={`WORK_EXPERIENCE-${index}`}
                                      index={index}
                                    >
                                      {(provided, snapshot) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          className={`text-black font-light mb-5 hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                                            "outline-dashed outline-2 outline-gray-400 bg-white"
                                            }`}
                                        >
                                          <div className="gap-2 item-center space-y-1 flex text-black ">
                                            <p className="content  i-bold text-2xl" style={{ fontSize: '1.3rem' }}>{item.company}</p>
                                            <DateRange
                                              startYear={item.startYear}
                                              endYear={item.endYear}
                                              id={`work-experience-start-end-date`}
                                            />
                                          </div>
                                          <p className="content">{item.position}</p>
                                          <p className="content hyphens-auto hover:outline-dashed hover:outline-2 hover:outline-gray-400"
                                          contentEditable="true"
                                          suppressContentEditableWarning={true}>
                                            {item.description}
                                          </p>
                                          <Droppable
                                            droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                                            type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
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
                                                        key={`${item.company}-${index}-${subIndex}`}
                                                        draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                                        index={subIndex}
                                                      >
                                                        {(provided, snapshot) => (
                                                          <li
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`
                                                    hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                                    ${snapshot.isDragging &&
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
                          {resumeData.projects.length > 0 && (
                            <Droppable droppableId="projects" type="PROJECTS">
                              {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                  <h2
                                    className="section-title mb-1 border-b-2 border-gray-300 editable"
                                    contentEditable
                                    suppressContentEditableWarning
                                    style={{ color: headerColor }} >
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
                                          className={`text-black font-light hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
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
                                          <p className="content">{item.description}</p>
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
                                                            className={`text-black font-light 
                                                    hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                                    ${snapshot.isDragging &&
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
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-black" style={{ color: headerColor }}>LANGUAGE</h2>
                  <div className="flex text-black font-light justify-start mb-4 font-bold">
                  <Language  languages={resumeData.languages} />
                  </div>
                </div>
            </div>
            <div class="p-5 w-1/2">
              <div className="mb-8">
                  <h2 className="text-xl font-bold text-black mb-2 " style={{ color: headerColor }}>SKILLS</h2>
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
                                        className={`text-black font-light mb-5 hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                                          "outline-dashed outline-2 outline-gray-400 bg-white"
                                          }`}
                                      >
                                        <Skills title={skill.title} skills={skill.skills} />
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                </div>
                <div className="mb-8 ">
                <h2 className="text-xl text-black font-bold mb-2" style={{ color: headerColor }}>EDUCATION</h2>
                <div className="mb-4">
                <ul className="list-none p-0">
                  {resumeData.education.length > 0 && (
                            <div className="mb-5">
                              {resumeData.education.map((item, index) => (
                                <div  key={index} className="text-black font-light mb-5">
                                  <p className="content i-bold " style={{ fontSize: '1.3rem' }}>{item.degree}</p>
                                  <p className="content">{item.school}</p>
                                  <DateRange className="mb-1 text-lg"
                                    startYear={item.startYear}
                                    endYear={item.endYear}
                                    id={`education-start-end-date`}
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                  </ul>
                  
                </div>
                
              </div>
              <div class=" text-left">
                  <h2 class="text-xl font-bold uppercase text-black mb-5">Reference</h2>
                  <div class="">
                    <div class="mb-5">
                      <p class="text-l font-semibold mb-2 uppercase text-black">Estelle Darcy</p>	
                      <p class="font-light mb-2 text-black">Wardlere Inc. / CTO</p>
                      <p class="font-light mb-2 text-black">Phone: 123-456-7890</p>
                      <p class="font-light mb-2 text-black">Email: abc@gmail.com</p>
                    </div>
                    <div class="mb-5">
                      <p class="text-l font-semibold mb-2 uppercase text-black">Harper Richard</p>	
                      <p class="font-light mb-2 text-black">Wardlere Inc. / CEO</p>
                      <p class="font-light mb-2 text-black">Phone: 123-456-7890</p>
                      <p class="font-light mb-2 text-black">Email: abc@gmail.com</p>
                    </div>
                  </div>
                </div>
            </div>
            
        </div>
        <div className="mb-8 pt-2.5 ">    
            <h1 className="text-7xl text-center text-black font-bold mb-4" style={{ color: headerColor }}>{resumeData.name}</h1>
        </div>              
      </div>
    );
};

const A4PageWrapper = ({ children }) => {
    const alertA4Size = () => {
        const preview = document.querySelector(".preview");
        const previewHeight = preview.offsetHeight;
        console.log(previewHeight);
        if (previewHeight > 1122) {
            alert("A4 size exceeded");
        }
    };

    return (
        <div className="w-8.5in border p-3" onLoad={alertA4Size}>
            {children}
        </div>
    );

};

export default Template25;
