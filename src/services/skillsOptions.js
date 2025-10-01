export const skillsOptions = [
  {
    id: 'frontend',
    label: 'Frontend',
    Title: '<h2>Front-End Web Development</h2>',
    designation: 'Fronted Developer',
    tagline: `A frontend developer with over 10+ years of experience`,
    Intro: (skills) => {
      const formattedSkills = skills
        .split(', ')
        .map((skill) => `<u>${skill}</u>`)
        .join(', ');
      return `<p>Equipped with a wealth of frontend development expertise, I specialize in crafting seamless user experiences using technologies such as ${formattedSkills} and more. My commitment to delivering performant, secure, and accessible web applications is evident.<p>&nbsp;</p><strong>Key highlights of my front-end development expertise include:</strong ></p>
      
      <p>&nbsp;</p>

      <ul>
      
      <<skills_group>>
      
    
    <li>
        Extensive experience in project initiation, refactoring, and structural enhancement, contributing to a comprehensive project lifecycle.
    </li>
    <li>
        Adherence to coding best practices following <u>SOLID </u>principles, establishing a foundation of excellence in software development.
    </li>
    <li>
        Strategic use of both Static Site Generation(<u>SSG</u>) and Server-Side Rendering(<u>SSR</u>) to elevate website speed and meet <u>SEO</u> standards effectively.
    </li>
    <li>
        Utilization of <u>webpack</u> for code optimization and the creation of custom builds tailored to project requirements.
    </li>
    <li>
        Specialized expertise in transforming <u>Figma</u>, <u>Adobe XD,</u> and <u>PSD </u>designs into pixel-perfect and seamlessly functional <u>HTML </u>templates.
    </li>
    <li>
        A holistic focus on development aspects, including security, performance, and web accessibility, ensuring well-rounded and robust applications.
    </li>
    <li>
        Profound knowledge of <u>CI/CD</u> processes, contributing to efficient application integration and deployment.
    </li>
    <li>
        User-centric design approach prioritizing interfaces that enhance the overall user experience.
    </li>
    <li>
        Dedication to crafting reusable components and implementing effective state management, championing a component-based approach for scalability and reusability.
    </li>
    <li>
        Commitment to clean and modular coding practices, ensuring codebases are not only functional but also easily maintainable.
    </li>
      
      </ul>

      `;
    },
    mainIntro: `
<p>
    &nbsp;
</p>
<p>
    I have maintained, developed, and launched multiple projects from scratch, carrying the development of its' back-end and front-end codebases. My current toolset includes <u>JavaScript</u>, <u>TypeScript</u>, <u>Node.js</u>, <u>React</u>, <u>Next.js</u>, <u>Serverless</u> Programming, <u>HTML5</u>, <u>CSS</u>/<u>SASS</u>/<u>SCSS,</u> <u>Redux</u>, <u>Appolo,</u> <u>GraphQL</u>, <u>TailwindCSS</u>, <u>MaterialUI</u>, <u>Docker</u>, <u>AWS</u>, <u>MongoDB</u>, <u>PostgreSQL</u>, <u>Git</u>, <u>CI/CD,</u> and the other various frameworks, libraries, and technologies related to them.
</p>
<p>
    &nbsp;
</p>
<p>
    <strong>I can help you with all the sides of your project:</strong>
</p>
<p>
    &nbsp;
</p>
<ul>
    <li>
        verifying good <u>UI/UX</u> design,
    </li>
    <li>
        leading/co-developing the <u>back-end</u> and <u>front-end</u>,
    </li>
    <li>
        setting up the<u> CI/CD</u>,
    </li>
    <li>
        mentoring the team,
    </li>
    <li>
        estimating tasks,
    </li>
    <li>
        researching possible techs,
    </li>
    <li>
        leading, launching, and monitoring the project.
    </li>
</ul>
<p>
    Call me a Swiss Army Knife in terms of software.
</p>
<p>
    &nbsp;
</p>
<hr>`,
    Skills: 'abc',
  },
  {
    id: 'backend',
    label: 'Backend',
    Title: '<h2>Back-End Web Development</h2>',
    designation: 'Backend Developer',
    tagline: `A backend developer with over 10+ years of experience`,
    Intro: (skills) => {
      const formattedSkills = skills
        .split(', ')
        .map((skill) => `<u>${skill}</u>`)
        .join(', ');
        return `<p>Equipped with a wealth of frontend development expertise, I specialize in crafting seamless user experiences using technologies such as ${formattedSkills} and more. My commitment to delivering performant, secure, and accessible web applications is evident.<p>&nbsp;</p><strong>Key highlights of my front-end development expertise include:</strong ></p>
      
        <p>&nbsp;</p>
  
        <ul>
        
        <<skills_group>>
        
   <li>Strategic implementation of <span class="modifiedText">REST APIs,</span> optimizing data transfer and
        communication between front-end and back-end systems.</li>
    <li>Extensive experience in back-end project initiation, refactoring, and structural enhancement, contributing to a
        comprehensive project lifecycle.</li>
    <li>Adherence to coding best practices, incorporating back-end-specific security measures to ensure robust
        application <span class="modifiedText">security</span>.</li>
    <li>Holistic focus on back-end securities, prioritizing the implementation of measures to safeguard against
        potential vulnerabilities.</li>
    <li>Profound knowledge of back-end testing strategies, including <span class="modifiedText">unit testing</span>,
        integration testing, and <span class="modifiedText">end-to-end</span> testing, to ensure the reliability of
        <span class="modifiedText">back-end</span> functionality.</li>
    <li>Commitment to clean and modular coding practices, ensuring back-end codebases are not only functional but also
        easily maintainable.</li>
</ul>
      
  
        `;   },
    mainIntro: '',
    Skills: 'abc',
  },
  {
    id: 'financialModelling',
    label: 'Financial Modelling',
    Title: '<h2>Financial Modeling</h2>',
    designation: 'Fronted Developer',
    tagline: `A frontend developer with over 10+ years of experience`,
    Intro: (skills) => {
      const formattedSkills = skills
        .split(', ')
        .map((skill) => `<u>${skill}</u>`)
        .join(', ');
        return `<p>With a strong foundation in backend development, I bring proficiency in ${formattedSkills} and many more. My experience encompasses various aspects of backend architecture and development, ensuring robust, scalable, and secure applications. <p>&nbsp;</p> <strong>Key highlights of my back-end development expertise include:</strong></p>`;
      },
    mainIntro:  `
    <p>
        &nbsp;
    </p>
    <p>
        I have maintained, developed, and launched multiple projects from scratch, carrying the development of its' back-end and front-end codebases. My current toolset includes <u>JavaScript</u>, <u>TypeScript</u>, <u>Node.js</u>, <u>React</u>, <u>Next.js</u>, <u>Serverless</u> Programming, <u>HTML5</u>, <u>CSS</u>/<u>SASS</u>/<u>SCSS,</u> <u>Redux</u>, <u>Appolo,</u> <u>GraphQL</u>, <u>TailwindCSS</u>, <u>MaterialUI</u>, <u>Docker</u>, <u>AWS</u>, <u>MongoDB</u>, <u>PostgreSQL</u>, <u>Git</u>, <u>CI/CD,</u> and the other various frameworks, libraries, and technologies related to them.
    </p>
    <p>
        &nbsp;
    </p>
    <p>
        <strong>I can help you with all the sides of your project:</strong>
    </p>
    <p>
        &nbsp;
    </p>
    <ul>
        <li>
            verifying good <u>UI/UX</u> design,
        </li>
        <li>
            leading/co-developing the <u>back-end</u> and <u>front-end</u>,
        </li>
        <li>
            setting up the<u> CI/CD</u>,
        </li>
        <li>
            mentoring the team,
        </li>
        <li>
            estimating tasks,
        </li>
        <li>
            researching possible techs,
        </li>
        <li>
            leading, launching, and monitoring the project.
        </li>
    </ul>
    <p>
        Call me a Swiss Army Knife in terms of software.
    </p>
    <p>
        &nbsp;
    </p>
    <hr>`,

    Skills: 'abc',
  },
  {
    id: 'bookKeeping',
    label: 'Book Keeping',
    Title: '<h2>Book Keeping</h2>',
    Intro: (skills) => {
      const formattedSkills = skills
        .split(', ')
        .map((skill) => `<u>${skill}</u>`)
        .join(', ');
      return `<p>Equipped with a wealth of Book Keeping expertise, I specialize in crafting seamless user experiences using technologies such as ${formattedSkills} and more. My commitment to delivering performant, secure, and accessible web applications is evident. <p>&nbsp;</p> <strong>Key highlights of my Book Keeping expertise include:</strong></p>`;
    },
    mainIntro: '',
    Skills: 'abc',
  },
  {
    id: 'devops',
    label: 'DevOps',
    Title: '<h2>What About Dev-Ops, Design, UI, Project Leadership, Team Mentorship ?</h2>',
    designation: 'DevOps Developer',
    tagline: `A DevOps developer with over 10+ years of experience`,
    Intro: (skills) => {
      const formattedSkills = skills
        .split(', ')
        .map((skill) => `<u>${skill}</u>`)
        .join(', ');
      return `
      <p>
          With a robust DevOps background, I specialize in orchestrating seamless integration, leveraging key technologies such as ${formattedSkills}. Also Proficient in <u>Project Leadership,</u> and <u>Project Management Tools</u>, and <u>Team Mentorship</u> Notable highlights include:
      </p>
      <p>
          &nbsp;
      </p>
      <ul>
      <<skills_group>>
          <li>
              Efficient deployment optimization and scalability.
          </li>
         
          <li>
              Utilization of <u>Docker </u>and <u>Kubernetes </u>for containerization.
          </li>
          <li>
              Proficiency in <u>YAML </u>for streamlined configuration.
          </li>
          
          <li>
              Expertise in <u>Git </u>and <u>GitHub, Gitlab, BitBucket,</u> and <u>SourceTree </u>for version control.
          </li>
          <li>
              Implementation of <u>CI/CD</u> pipelines for automated workflows.
          </li>
          <li>
              Configuration and management of <u>Nginx </u>and <u>Apache </u>servers for optimal web performance.
          </li>
      </ul>
      <p>
          <strong>Project Leadership:</strong>
      </p>
      <p>
          &nbsp;
      </p>
      <ul>
          <li>
              Proficient in creating and executing strategic project plans, and aligning team efforts with overarching organizational goals.
          </li>
          <li>
              Adept at identifying potential risks early in the project lifecycle and implementing proactive measures to mitigate them.
          </li>
          <li>
              Skilled in maintaining transparent communication with stakeholders, ensuring alignment and satisfaction throughout project execution.
          </li>
          <li>
              Demonstrated ability to make informed and timely decisions, balancing short-term needs with long-term project objectives.
          </li>
      </ul>
      <p>
          <strong>Project Management Tools:</strong>
      </p>
      <p>
          &nbsp;
      </p>
      <ul>
          <li>
              Proficient in <u>Agile </u>methodologies, utilizing frameworks like Scrum and Kanban for iterative and adaptive project management.
          </li>
          <li>
              Extensive experience in using project management tools like <u>Jira </u>and <u>Trello </u>for task tracking, sprint planning, and team collaboration.
          </li>
          <li>
              Familiarity with <u>Asana </u>and <u>Monday.com</u> for streamlined project workflows and effective team coordination.
          </li>
          <li>
              Utilization of <u>Gantt charts</u> to visualize project timelines, dependencies, and critical milestones.
          </li>
      </ul>
      <p>
          <strong>Team Mentorship:</strong>
      </p>
      <p>
          &nbsp;
      </p>
      <ul>
          <li>
              Actively engage in knowledge-sharing sessions, fostering a collaborative team environment where insights are exchanged.
          </li>
          <li>
              Implement mentorship programs aimed at enhancing the skills and capabilities of team members.
          </li>
          <li>
              Promote a culture of constructive feedback, providing regular assessments to aid professional growth.
          </li>
          <li>
              Skillful in delegating tasks based on team members' strengths, maximizing productivity, and fostering a sense of ownership.
          </li>
      </ul>
      <p>
          <strong>Conflict Resolution:</strong>
      </p>
      <ul>
          <li>
              Proficient in mediating conflicts within the team, and finding amicable resolutions to ensure continued productivity.
          </li>
          <li>
              Establish an environment where team members feel comfortable expressing concerns and facilitating open dialogue.
          </li>
      </ul>
      <p>
          <strong>Continuous Improvement:</strong>
      </p>
      <ul>
          <li>
              Conduct regular retrospectives to assess project performance, identify areas for improvement, and implement actionable insights.
          </li>
          <li>
              Embrace an adaptive leadership style, responding to changing project dynamics and evolving team needs.
          </li>
      </ul>`;
    },
    mainIntro: '',
    Skills: 'abc',
  },
  {
    id: 'wordpress',
    label: 'Wordpress',
    Title: '<h2>Wordpress Development</h2>',
    designation: 'Wordpress Developer',
    tagline: `A Wordpress developer with over 10+ years of experience`,
    Intro: (skills) => {
      const formattedSkills = skills
        .split(', ')
        .map((skill) => `<u>${skill}</u>`)
        .join(', ');
      return `<p>
      My proficiency in PHP, the foundation of WordPress, allows me to craft dynamic and custom solutions. I've developed and fine-tuned WordPress plugins and themes, harnessing the full power of PHP to create bespoke website functionalities. I am skilled in different tech stacks such as ${formattedSkills}. Notable highlights include:
   </p>
   <p>
       &nbsp;
   </p>
   <ul>
   <<skills_group>>
       


<li>Proficient in designing, developing, and maintaining dynamic WordPress websites.</li>
<li>Expertise in PHP programming within the WordPress ecosystem.</li>
<li>Strong understanding of MySQL database integration and optimization for efficient data management in WordPress.</li>
<li>Skilled in customizing and extending WordPress themes and plugins.</li>
<li>Proven track record in troubleshooting and debugging complex WordPress websites.</li>
<li>Knowledgeable in front-end technologies like HTML, CSS, and JavaScript to enhance WordPress user interfaces.</li>
<li>Experienced in version control systems such as Git for collaborative WordPress development projects.</li>
<li>Familiarity with security best practices to safeguard WordPress sites against vulnerabilities.</li>
<li>Continuously staying updated on the latest WordPress trends and innovations to implement best practices in development projects.</li>
</ul>
`;
    },
    mainIntro: '',
    Skills: 'abc',
  },
  {
    id: 'shopify',
    label: 'Shopify',
    Title: '<h2>Shopify Development</h2>',
    designation: 'Shopify Developer',
    tagline: `A Shopify developer with over 10+ years of experience`,
    Intro: (skills) => {
      const formattedSkills = skills
        .split(', ')
        .map((skill) => `<u>${skill}</u>`)
        .join(', ');
      return `<p>
      With over half a decade immersed in the Shopify ecosystem, I have cultivated a mastery over its distinct features, tools, and capabilities. My expertise spans the core elements of the platform, including Liquid programming, integrations via the Shopify API, advanced theme customization, and leveraging Shopify-specific plugins and apps. My primary goal? To design and implement e-commerce solutions that not only thrive on Shopify but also set new industry benchmarks. I am skilled in different tech stacks such as ${formattedSkills}. Notable highlights include:
    </p>
    <p>
        &nbsp;
    </p>
    <ul>
    <<skills_group>>
        


<li>Proficient in designing, developing, and maintaining dynamic Shopify e-commerce stores.</li>
<li>Expertise in Liquid programming language within the Shopify platform.</li>
<li>Strong understanding of Shopify theme customization and optimization.</li>
<li>Skilled in integrating and customizing Shopify apps to enhance store functionality.</li>
<li>Proven track record in troubleshooting and debugging complex Shopify stores.</li>
<li>Knowledgeable in front-end technologies like HTML, CSS, and JavaScript for Shopify storefront customization.</li>
<li>Experienced in version control systems such as Git for collaborative Shopify development projects.</li>
<li>Familiarity with security best practices to ensure a secure e-commerce environment on the Shopify platform.</li>
<li>Continuously staying updated on the latest Shopify trends and innovations to implement best practices in development projects.</li>
</ul>`;
    },
    mainIntro: '',
    Skills: 'abc',
  },
  {
    id: 'wooCommerce',
    label: 'WooCommerce',
    Title: '<h2>WooCommerce Developmen</h2>t',
    designation: 'Shopify Developer',
    tagline: `A Shopify developer with over 10+ years of experience`,
    Intro: (skills) => {
      const formattedSkills = skills
        .split(', ')
        .map((skill) => `<u>${skill}</u>`)
        .join(', ');
      return `<p>
      Proficiency in integrating and customizing e-commerce solutions within WordPress. Secure payment processing, efficient inventory management, and a smooth shopping experience. Empowering businesses to thrive in the online retail landscape. I am skilled in different tech stacks such as ${formattedSkills}. Notable highlights include:
    </p>
    <p>
        &nbsp;
    </p>
    <ul>
    <<skills_group>>
        


<li>Proficient in designing, developing, and maintaining dynamic e-commerce websites using WooCommerce.</li>
<li>Expertise in PHP programming within the WooCommerce ecosystem.</li>
<li>Strong understanding of MySQL database integration and optimization for efficient data management in WooCommerce.</li>
<li>Skilled in customizing and extending WooCommerce themes and plugins.</li>
<li>Proven track record in troubleshooting and debugging complex WooCommerce setups.</li>
<li>Knowledgeable in front-end technologies like HTML, CSS, and JavaScript to enhance WooCommerce user interfaces.</li>
<li>Experienced in version control systems such as Git for collaborative WooCommerce development projects.</li>
<li>Familiarity with security best practices to safeguard WooCommerce sites against vulnerabilities.</li>
<li>Continuously staying updated on the latest WooCommerce trends and innovations to implement best practices in development projects.</li>
</ul>`;
    },
    mainIntro: '',
    Skills: 'abc',
  },
  {
    id: 'reactnext',
    label: 'React, Next',
    Title: '<h2>React.js, Next.js Development</h2>',
    Intro: (skills) => {
      const formattedSkills = skills
        .split(', ')
        .map((skill) => `<u>${skill}</u>`)
        .join(', ');
      return `<p>Equipped with a wealth of WooCommerce development expertise, I specialize in crafting seamless user experiences using technologies such as ${formattedSkills} and more. My commitment to delivering performant, secure, and accessible web applications is evident. <p>&nbsp;</p> <strong>Key highlights of my WooCommerce development expertise include:</strong></p>`;
    },
    mainIntro: '',
    Skills: 'abc',
  },
  {
    id: 'node',
    label: 'Node',
    Title: '<h2>Node.js Development</h2>',
    Intro: (skills) => {
      const formattedSkills = skills
        .split(', ')
        .map((skill) => `<u>${skill}</u>`)
        .join(', ');
      return `<p>Equipped with a wealth of WooCommerce development expertise, I specialize in crafting seamless user experiences using technologies such as ${formattedSkills} and more. My commitment to delivering performant, secure, and accessible web applications is evident. <p>&nbsp;</p> <strong>Key highlights of my WooCommerce development expertise include:</strong></p>`;
    },
    mainIntro: '',
    Skills: 'abc',
  },
  {
    id: 'php',
    label: 'PHP',
    Title: '<h2>PHP Development</h2>',
    Intro: (skills) => {
      const formattedSkills = skills
        .split(', ')
        .map((skill) => `<u>${skill}</u>`)
        .join(', ');
      return `<p>
      I am a seasoned PHP developer with a strong background in back-end web development. My experience and skills encompass a wide range of technologies such as ${formattedSkills}. Notable highlights include:
  </p>
  <p>
      &nbsp;
  </p>
  <ul>
  <<skills_group>>
      
<li>Over 5 years of hands-on experience in PHP development.</li>
<li>Proficient in designing, developing, and maintaining dynamic web applications using PHP.</li>
<li>Expertise in server-side scripting, including PHP frameworks such as Laravel and CodeIgniter.</li>
<li>Strong understanding of MySQL database design and optimization for efficient data management.</li>
<li>Skilled in integrating third-party APIs and web services to enhance functionality.</li>
<li>Proven track record in troubleshooting and debugging complex PHP applications.</li>
<li>Knowledgeable in front-end technologies like HTML, CSS, and JavaScript to ensure seamless user experiences.</li>
<li>Experienced in version control systems such as Git for collaborative development projects.</li>
<li>Familiarity with security best practices to safeguard web applications against vulnerabilities.</li>
<li>Continuously staying updated on the latest PHP trends and innovations to implement best practices in development projects.</li>
</ul>
`;
    },
    mainIntro: '',
    Skills: 'abc',
  },
  {
    id: 'database',
    label: 'Database',
    Title: '<h2>Database Development</h2>',
    Intro: (skills) => {
      const formattedSkills = skills
        .split(', ')
        .map((skill) => `<u>${skill}</u>`)
        .join(', ');
      return `<p>Equipped with a wealth of WooCommerce development expertise, I specialize in crafting seamless user experiences using technologies such as ${formattedSkills} and more. My commitment to delivering performant, secure, and accessible web applications is evident. <p>&nbsp;</p> <strong>Key highlights of my WooCommerce development expertise include:</strong></p>`;
    },
    mainIntro: '',
    Skills: 'abc',
  },
  {
    id: 'nest',
    label: 'Nest',
    Title: '<h2>Nest.js Development</h2>',
    Intro: (skills) => {
      const formattedSkills = skills
        .split(', ')
        .map((skill) => `<u>${skill}</u>`)
        .join(', ');
      return `<p>Equipped with a wealth of WooCommerce development expertise, I specialize in crafting seamless user experiences using technologies such as ${formattedSkills} and more. My commitment to delivering performant, secure, and accessible web applications is evident. <p>&nbsp;</p> <strong>Key highlights of my WooCommerce development expertise include:</strong></p>`;
    },
    mainIntro: '',
    Skills: 'abc',
  },
  {
    id: 'angular',
    label: 'Angular',
    Title: '<h2>Angular Development</h2>',
    Intro: (skills) => {
      const formattedSkills = skills
        .split(', ')
        .map((skill) => `<u>${skill}</u>`)
        .join(', ');
      return `<p>Equipped with a wealth of WooCommerce development expertise, I specialize in crafting seamless user experiences using technologies such as ${formattedSkills} and more. My commitment to delivering performant, secure, and accessible web applications is evident. <p>&nbsp;</p> <strong>Key highlights of my WooCommerce development expertise include:</strong></p>`;
    },
    mainIntro: '',
    Skills: 'abc',
  },
  {
    id: 'fullstack',
    label: 'Full Stack',
    Title: '<h2>Angular Development</h2>',
    Intro: (skills) => {
      const formattedSkills = skills
        .split(', ')
        .map((skill) => `<u>${skill}</u>`)
        .join(', ');
      return `<p>Equipped with a wealth of WooCommerce development expertise, I specialize in crafting seamless user experiences using technologies such as ${formattedSkills} and more. My commitment to delivering performant, secure, and accessible web applications is evident. <p>&nbsp;</p> <strong>Key highlights of my WooCommerce development expertise include:</strong></p>`;
    },
    mainIntro: `<p>
    <strong>A full-stack software engineer with over 10+ years of experience.</strong>
</p>
<p>
    &nbsp;
</p>
<p>
    I have maintained, developed, and launched multiple projects from scratch, carrying the development of its' back-end and front-end codebases. My current toolset includes <u>JavaScript</u>, <u>TypeScript</u>, <u>Node.js</u>, <u>React</u>, <u>Next.js</u>, <u>Serverless</u> Programming, <u>HTML5</u>, <u>CSS</u>/<u>SASS</u>/<u>SCSS,</u> <u>Redux</u>, <u>Appolo,</u> <u>GraphQL</u>, <u>TailwindCSS</u>, <u>MaterialUI</u>, <u>Docker</u>, <u>AWS</u>, <u>MongoDB</u>, <u>PostgreSQL</u>, <u>Git</u>, <u>CI/CD,</u> and the other various frameworks, libraries, and technologies related to them.
</p>
<p>
    &nbsp;
</p>
<p>
    <strong>I can help you with all the sides of your project:</strong>
</p>
<p>
    &nbsp;
</p>
<ul>
    <li>
        verifying good <u>UI/UX</u> design,
    </li>
    <li>
        leading/co-developing the <u>back-end</u> and <u>front-end</u>,
    </li>
    <li>
        setting up the<u> CI/CD</u>,
    </li>
    <li>
        mentoring the team,
    </li>
    <li>
        estimating tasks,
    </li>
    <li>
        researching possible techs,
    </li>
    <li>
        leading, launching, and monitoring the project.
    </li>
</ul>
<p>
    Call me a Swiss Army Knife in terms of software.
</p>
<p>
    &nbsp;
</p>
<hr>`,
    Skills: 'abc',
  },
  {
    id: 'laravel',
    label: 'Laravel',
    Title: '<h2>Laravel Full Stack Development</h2>',
    Intro: (skills) => {
      const formattedSkills = skills
        .split(', ')
        .map((skill) => `<u>${skill}</u>`)
        .join(', ');
      return `<p>Equipped with a wealth of WooCommerce development expertise, I specialize in crafting seamless user experiences using technologies such as ${formattedSkills} and more. My commitment to delivering performant, secure, and accessible web applications is evident. <p>&nbsp;</p> <strong>Key highlights of my WooCommerce development expertise include:</strong></p>`;
    },
    mainIntro: '',
    Skills: 'abc',
  },
  {
    id: 'QA',
    label: 'QA',
    Title: '<h2>Jest, Unit Tests, QA</h2>',
    Intro: (skills) => {
      const formattedSkills = skills
        .split(', ')
        .map((skill) => `<u>${skill}</u>`)
        .join(', ');
      return `<p>Equipped with a wealth of WooCommerce development expertise, I specialize in crafting seamless user experiences using technologies such as ${formattedSkills} and more. My commitment to delivering performant, secure, and accessible web applications is evident. <p>&nbsp;</p> <strong>Key highlights of my WooCommerce development expertise include:</strong></p>`;
    },
    mainIntro: '',
    Skills: 'abc',
  },
  {
    id: 'woocommerce',
    label: 'woocommerce',
    Title: '<h2>WooCommerce Store Development</h2>',
    Intro: (skills) => {
      const formattedSkills = skills
        .split(', ')
        .map((skill) => `<u>${skill}</u>`)
        .join(', ');
      return `<p>Equipped with a wealth of WooCommerce development expertise, I specialize in crafting seamless user experiences using technologies such as ${formattedSkills} and more. My commitment to delivering performant, secure, and accessible web applications is evident. <p>&nbsp;</p> <strong>Key highlights of my WooCommerce development expertise include:</strong></p>`;
    },
    mainIntro: '',
    Skills: 'abc',
  },
  {
    id: 'aws',
    label: 'aws',
    Title: '<h2>AWS Web Services Development</h2>',
    Intro: (skills) => {
      const formattedSkills = skills
        .split(', ')
        .map((skill) => `<u>${skill}</u>`)
        .join(', ');
      return `<p>Equipped with a wealth of WooCommerce development expertise, I specialize in crafting seamless user experiences using technologies such as ${formattedSkills} and more. My commitment to delivering performant, secure, and accessible web applications is evident. <p>&nbsp;</p> <strong>Key highlights of my WooCommerce development expertise include:</strong></p>`;
    },
    mainIntro: '',
    Skills: 'abc',
  }



  
];
