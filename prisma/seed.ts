import { catalogSkills } from "../Frontend/src/Components/Modals/EditProfileModal/skillGroups";
import { prisma } from "../Backend/src/lib/prisma";

const INTERVIEWER_ID = "g1th0b07-t8em-gu3s-tu53r-int3rv13ver7";

const minutesAgo = (minutes: number) =>
  new Date(Date.now() - minutes * 60 * 1000);

const onlyCatalogSkills = (skills: string[]) =>
  skills.filter((skill) => catalogSkills.includes(skill));

async function main() {
  console.log("Starting database seeding...");

  console.log("Cleaning old data...");
  await prisma.message.deleteMany();
  await prisma.groupChat.deleteMany();
  await prisma.chat.deleteMany();
  await prisma.groupInvite.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.commentLike.deleteMany();
  await prisma.postLike.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.follows.deleteMany();
  await prisma.group.deleteMany();
  await prisma.user.deleteMany();

  const profilePics = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=500&auto=format&fit=crop&q=80",
  ];

  const bannerPics = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1200&auto=format&fit=crop&q=80",
  ];

  const groupPics = {
    productionSquad: {
      avatar:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=80",
      banner:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    },
    frontendFriday: {
      avatar:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&auto=format&fit=crop&q=80",
      banner:
        "https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&auto=format&fit=crop&q=80",
    },
    cloudRoom: {
      avatar:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=80",
      banner:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&auto=format&fit=crop&q=80",
    },
    guestGroup: {
      avatar:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=80",
      banner:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop&q=80",
    },
  };

  const postMedias = [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&auto=format&fit=crop&q=80",
  ];

  const userData = [
    {
      username: "alex_dev",
      name: "Alex Rivera",
      bio: "Senior full-stack engineer. TypeScript by day, Rust on weekends.",
      tags: onlyCatalogSkills([
        "TypeScript",
        "Rust",
        "Next.js",
        "React",
        "Node.js",
        "PostgreSQL",
        "Git",
        "GitHub",
        "Docker",
        "REST APIs",
      ]),
      socials: ["github.com/alex_dev", "twitter.com/alex_codes"],
    },
    {
      username: "sarah_codes",
      name: "Sarah Chen",
      bio: "Backend engineer who lives in Python. FastAPI, data, and clean APIs.",
      tags: onlyCatalogSkills([
        "Python",
        "FastAPI",
        "Django",
        "PostgreSQL",
        "Docker",
        "Linux",
        "Git",
        "GitHub",
        "Unit Testing",
        "SQL",
      ]),
      socials: ["github.com/sarah_codes"],
    },
    {
      username: "dan_m",
      name: "Dan Murphy",
      bio: "DevOps engineer. If it is not in a pipeline, it does not exist.",
      tags: onlyCatalogSkills([
        "Docker",
        "Kubernetes",
        "AWS",
        "Linux",
        "CI/CD",
        "GitHub Actions",
        "Terraform",
        "Bash / Shell",
        "Git",
      ]),
      socials: ["github.com/dan_m"],
    },
    {
      username: "elena_design",
      name: "Elena Rostova",
      bio: "Frontend developer. I care about accessibility, CSS, and React.",
      tags: onlyCatalogSkills([
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "React",
        "Git",
        "GitHub",
        "Agile / Scrum",
      ]),
      socials: ["github.com/elena_design", "linkedin.com/in/elena"],
    },
    {
      username: "marcus_tech",
      name: "Marcus Johnson",
      bio: "Systems person. Linux, C, and keeping servers boring.",
      tags: onlyCatalogSkills([
        "C",
        "Linux",
        "Bash / Shell",
        "Git",
        "Python",
        "Docker",
        "C++",
      ]),
      socials: ["github.com/marcus_tech"],
    },
    {
      username: "clara_van",
      name: "Clara Vance",
      bio: "Product-minded engineer. I write tickets, then I close them myself.",
      tags: onlyCatalogSkills([
        "Git",
        "GitHub",
        "Agile / Scrum",
        "SQL",
        "JavaScript",
        "REST APIs",
      ]),
      socials: ["github.com/clara_van"],
    },
    {
      username: "tech_nomad",
      name: "James Wilson",
      bio: "Building small SaaS tools with Node, Express, and Postgres.",
      tags: onlyCatalogSkills([
        "JavaScript",
        "TypeScript",
        "Node.js",
        "Express",
        "PostgreSQL",
        "React",
        "REST APIs",
        "Git",
      ]),
      socials: ["github.com/tech_nomad"],
    },
    {
      username: "lina_graphics",
      name: "Lina G",
      bio: "Frontend performance nerd. React, TypeScript, and careful CSS.",
      tags: onlyCatalogSkills([
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS",
        "React",
        "Git",
        "Svelte",
      ]),
      socials: ["github.com/lina_graphics"],
    },
    {
      username: "nik_devops",
      name: "Nikolai Tesla",
      bio: "Infrastructure engineer. Terraform plans are my bedtime stories.",
      tags: onlyCatalogSkills([
        "Docker",
        "Kubernetes",
        "AWS",
        "Azure",
        "Linux",
        "CI/CD",
        "GitHub Actions",
        "Terraform",
        "Bash / Shell",
      ]),
      socials: ["github.com/nik_devops"],
    },
    {
      username: "coder_cat",
      name: "Milo Cat",
      bio: "I write tests, then I sit on the keyboard. Unit Testing is my sport.",
      tags: onlyCatalogSkills([
        "JavaScript",
        "TypeScript",
        "Unit Testing",
        "Git",
        "GitHub",
      ]),
      socials: ["github.com/coder_cat"],
    },
  ];

  console.log("Creating the guest interviewer and demo users...");

  const interviewer = await prisma.user.create({
    data: {
      id: INTERVIEWER_ID,
      github_id: "git_guest_interviewer",
      email: "guest@gitx.dev",
      username: "gitx_guest",
      display_name: "GitX Guest",
      github_profile_url: "https://github.com/gitx_guest",
      profile_picture_url:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=80",
      banner_picture_url: bannerPics[0],
      tags: onlyCatalogSkills([
        "TypeScript",
        "JavaScript",
        "React",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Git",
        "GitHub",
        "REST APIs",
        "Agile / Scrum",
      ]),
      socials: ["github.com/gitx_guest"],
      bio: "Guest interviewer account. Here to look around GitX, join groups, and talk to the team.",
    },
  });

  const communityUsers = [];
  for (let i = 0; i < userData.length; i++) {
    const data = userData[i];
    const user = await prisma.user.create({
      data: {
        github_id: `git_${100000 + i}`,
        email: `${data.username}@example.com`,
        username: data.username,
        display_name: data.name,
        github_profile_url: `https://github.com/${data.username}`,
        profile_picture_url: profilePics[i % profilePics.length],
        banner_picture_url: bannerPics[i % bannerPics.length],
        tags: data.tags,
        socials: data.socials,
        bio: data.bio,
      },
    });
    communityUsers.push(user);
  }

  const users = [interviewer, ...communityUsers];
  const byUsername = Object.fromEntries(
    communityUsers.map((user) => [user.username, user]),
  );

  console.log("Creating follow graph...");
  for (const follower of users) {
    for (const following of users) {
      if (follower.id === following.id) {
        continue;
      }
      if (Math.random() > 0.25) {
        await prisma.follows.create({
          data: {
            follower_id: follower.id,
            following_id: following.id,
          },
        });
      }
    }
  }

  console.log("Creating groups that include the guest interviewer...");
  const productionSquad = await prisma.group.create({
    data: {
      group_name: "The Production Breaking Squad",
      bio: "We ship, we panic, we fix it on main. All hands welcome.",
      group_profile_picture_url: groupPics.productionSquad.avatar,
      group_banner_picture_url: groupPics.productionSquad.banner,
      creator_id: byUsername.alex_dev.id,
      members: { connect: users.map((user) => ({ id: user.id })) },
    },
  });

  const frontendFriday = await prisma.group.create({
    data: {
      group_name: "Frontend Friday",
      bio: "React, CSS, and accessibility chats. Guest reviewers always invited.",
      group_profile_picture_url: groupPics.frontendFriday.avatar,
      group_banner_picture_url: groupPics.frontendFriday.banner,
      creator_id: byUsername.elena_design.id,
      members: {
        connect: [
          interviewer,
          byUsername.elena_design,
          byUsername.alex_dev,
          byUsername.lina_graphics,
          byUsername.tech_nomad,
          byUsername.coder_cat,
        ].map((user) => ({ id: user.id })),
      },
    },
  });

  const cloudRoom = await prisma.group.create({
    data: {
      group_name: "Cloud & Pipelines",
      bio: "Docker, Kubernetes, Terraform, and the art of not SSHing into prod.",
      group_profile_picture_url: groupPics.cloudRoom.avatar,
      group_banner_picture_url: groupPics.cloudRoom.banner,
      creator_id: byUsername.dan_m.id,
      members: {
        connect: [
          interviewer,
          byUsername.dan_m,
          byUsername.nik_devops,
          byUsername.marcus_tech,
          byUsername.alex_dev,
          byUsername.sarah_codes,
        ].map((user) => ({ id: user.id })),
      },
    },
  });

  const guestGroup = await prisma.group.create({
    data: {
      group_name: "Guest's Group",
      bio: "Owned by the guest interviewer. Ask anything, break nothing (please).",
      group_profile_picture_url: groupPics.guestGroup.avatar,
      group_banner_picture_url: groupPics.guestGroup.banner,
      creator_id: interviewer.id,
      members: {
        connect: [
          interviewer,
          byUsername.alex_dev,
          byUsername.elena_design,
          byUsername.coder_cat,
        ].map((user) => ({ id: user.id })),
      },
    },
  });

  console.log("Creating realistic posts...");
  type SeedPost = {
    content: string;
    authorId: string;
    groupId?: string;
    media?: boolean;
  };

  const postBlueprints: SeedPost[] = [
    {
      authorId: byUsername.alex_dev.id,
      content:
        "Shipped a TypeScript + Express API in front of PostgreSQL today. The Prisma queries are finally matching the React types on the client. That alone saved a whole class of bugs.",
    },
    {
      authorId: byUsername.sarah_codes.id,
      content:
        "Wrote a FastAPI endpoint that was slow until I looked at the SQL. One missing index on PostgreSQL, and the p95 dropped from 800ms to 40ms. Indexes are still magic.",
    },
    {
      authorId: byUsername.dan_m.id,
      groupId: cloudRoom.id,
      content:
        "Reminder for Cloud & Pipelines: if your Dockerfile copies node_modules from the host, we will find you. Multi-stage builds, please. The Kubernetes nodes will thank you.",
    },
    {
      authorId: byUsername.elena_design.id,
      groupId: frontendFriday.id,
      content:
        "Frontend Friday question: do you still write CSS Modules, or did you switch everything to one giant global file? I am Team Modules. Naming things is hard, but leaking styles is worse.",
    },
    {
      authorId: interviewer.id,
      content:
        "Hi everyone — I am the GitX guest interviewer. I will lurk in groups, read posts, and ask a lot of questions about TypeScript, React, and PostgreSQL. Be nice to me.",
    },
    {
      authorId: byUsername.marcus_tech.id,
      content:
        "Spent the morning in a Linux box tracing a C service that leaked file descriptors. The bug was a missing close() on the error path. Classic. Always close what you open.",
    },
    {
      authorId: byUsername.clara_van.id,
      content:
        "Sprint note: we closed 11 tickets, slipped 2, and the REST API contract is now written down so frontend is not guessing field names. Agile is just talking before coding. Wild concept.",
    },
    {
      authorId: byUsername.tech_nomad.id,
      content:
        "New SaaS experiment: Node.js + Express + PostgreSQL, React on the front. No fancy framework. If a user can pay, I ship. If they cannot, I still ship, just sadder.",
    },
    {
      authorId: byUsername.lina_graphics.id,
      content:
        "React re-renders were eating my frame budget. Memoized the heavy list, moved a CSS animation off the main thread, and the UI stopped hitching. Performance is just deleting extra work.",
    },
    {
      authorId: byUsername.nik_devops.id,
      groupId: cloudRoom.id,
      content:
        "Terraform plan looked clean. Apply was not. AWS decided a security group I did not mention still belonged to me. Always terraform import the ghosts, or they haunt production.",
    },
    {
      authorId: byUsername.coder_cat.id,
      content:
        "Added unit tests, then sat on the keyboard and deleted half of them. The remaining ones still catch the TypeScript regressions. I call that a win. Meow.",
    },
    {
      authorId: byUsername.alex_dev.id,
      groupId: productionSquad.id,
      content:
        "Production Breaking Squad: we migrated the last REST endpoint off the old Node callback style. Express is boring now. That is the goal.",
    },
    {
      authorId: byUsername.sarah_codes.id,
      content:
        "Django vs FastAPI debate in the office. I like FastAPI for new APIs and Django when I need admin in ten minutes. Both talk to PostgreSQL. Both are fine. Please stop the war.",
    },
    {
      authorId: byUsername.elena_design.id,
      content:
        "Tiny CSS win: use gap on flex containers instead of margin-on-every-child. Your layout survives an extra item. HTML stays cleaner. Future you will not cry.",
    },
    {
      authorId: interviewer.id,
      groupId: frontendFriday.id,
      content:
        "Guest question for Frontend Friday: when you teach React, do you start with components and props, or do you start with how state actually updates? I keep flipping the lesson plan.",
    },
    {
      authorId: byUsername.dan_m.id,
      content:
        "GitHub Actions finally caches Docker layers. CI went from 14 minutes to 4. I am going to take the extra 10 minutes and stare at Kubernetes dashboards like a proud parent.",
    },
    {
      authorId: byUsername.tech_nomad.id,
      groupId: productionSquad.id,
      content:
        "Anyone else deploying Express apps with one GitHub Actions workflow that runs tests, then builds, then ssh-s into a box? Asking for a friend who is me.",
    },
    {
      authorId: byUsername.lina_graphics.id,
      groupId: frontendFriday.id,
      content:
        "I replaced a Svelte prototype with React because the rest of the team lives there. The CSS mostly survived. The TypeScript types did not. Worth it for shared components.",
    },
    {
      authorId: byUsername.nik_devops.id,
      content:
        "Azure this week, AWS last week. Same Terraform ideas, different names for every resource. Cloud is just vocabulary with a credit card.",
    },
    {
      authorId: byUsername.marcus_tech.id,
      groupId: cloudRoom.id,
      content:
        "If your Bash script uses rm -rf on a variable, quote the variable. I will not explain this again. Linux does not forgive empty strings.",
    },
    {
      authorId: byUsername.clara_van.id,
      groupId: productionSquad.id,
      content:
        "We are putting GitHub issues next to the actual Git commits in the changelog. Product and engineering finally see the same story. Agile / Scrum works better when the board is not fiction.",
    },
    {
      authorId: interviewer.id,
      groupId: productionSquad.id,
      content:
        "Thanks for adding me to The Production Breaking Squad. I read the last outage thread. Next time walk me through how you used Git, Docker, and the logs together. I want the full story.",
    },
    {
      authorId: byUsername.alex_dev.id,
      content:
        "Hot take: Next.js is great until you just needed React and Node. Sometimes a Vite app plus Express is the whole product. Use the tool that matches the problem.",
    },
    {
      authorId: byUsername.coder_cat.id,
      groupId: frontendFriday.id,
      content:
        "Wrote a test that failed because the button text was 'Save' in the app and 'save' in the test. JavaScript is case-sensitive. I am a cat. I am also case-sensitive.",
    },
    {
      authorId: byUsername.sarah_codes.id,
      groupId: cloudRoom.id,
      content:
        "Python service is in Docker now. FastAPI + Gunicorn, health check, and a real PostgreSQL container in CI. Local SQLite was lying to us.",
    },
    {
      authorId: byUsername.alex_dev.id,
      content:
        "Hot take: everyone is chasing trillion-parameter models, but most production apps still run on small, boring models that just work. Reliability > hype.",
    },
    {
      authorId: byUsername.sarah_codes.id,
      content:
        "90% of devs use AI at work now and somehow we still Google 'how to center a div'. Balance in the universe is restored.",
    },
    {
      authorId: byUsername.dan_m.id,
      content:
        "The funniest thing about AI benchmarks is that the model that wins them is rarely the one your company actually deploys.",
    },
    {
      authorId: byUsername.elena_design.id,
      content:
        "Design in 2026: 10% Figma, 40% prompting AI, 50% fixing what the AI misunderstood.",
    },
    {
      authorId: byUsername.marcus_tech.id,
      content:
        "Reminder: X processes ~500M posts per day. Your tweet isn't flopping, it's just competing with half a billion others.",
    },
    {
      authorId: byUsername.tech_nomad.id,
      content:
        "Threads vs X vs Bluesky debates are funny. Devs will post wherever gets them 1) jobs 2) users 3) dopamine. In that order.",
    },
    {
      authorId: byUsername.lina_graphics.id,
      content:
        "AI image tools got so good that now the real skill is taste. The bottleneck is no longer execution, it's judgment.",
    },
    {
      authorId: byUsername.nik_devops.id,
      content:
        "Kubernetes is still harder to understand than any AI model I've used this year.",
    },
    {
      authorId: byUsername.coder_cat.id,
      content:
        "me: 'AI will replace coding'\nalso me: debugging AI-generated code for 3 hours because of one missing env variable",
    },
    {
      authorId: byUsername.alex_dev.id,
      content:
        "New AI models drop every week now. Feels like frontend frameworks in 2017 all over again.",
    },
    {
      authorId: byUsername.sarah_codes.id,
      content:
        "Long-form posts on X are replacing threads and honestly… good. I’m tired of reading 1/27 🧵",
    },
    {
      authorId: byUsername.dan_m.id,
      content:
        "The real AI skill isn't prompting. It's knowing when NOT to trust the output.",
    },
    {
      authorId: byUsername.marcus_tech.id,
      content:
        "557M monthly users and people still think X is 'dead'. Internet narratives are wild.",
    },
    {
      authorId: byUsername.tech_nomad.id,
      content:
        "If your stack needs a diagram to explain it, you probably overengineered it.",
    },
    {
      authorId: byUsername.nik_devops.id,
      content:
        "DevOps rule #1: if it works, don’t touch it.\nDevOps rule #2: someone will touch it.",
    },
    {
      authorId: byUsername.lina_graphics.id,
      content:
        "Everyone talks about AI replacing developers, but no one talks about it replacing bad UI.",
    },
    {
      authorId: byUsername.elena_design.id,
      content:
        "Clients: 'Can AI do it faster?'\nAlso clients: 12 rounds of feedback anyway.",
    },
    {
      authorId: byUsername.coder_cat.id,
      content:
        "console.log is temporary\nlogging framework is forever\nbugs are eternal",
    },
    {
      authorId: byUsername.marcus_tech.id,
      content:
        "China dropping 2.8T parameter models and most startups just need something that answers support tickets.",
    },
    {
      authorId: byUsername.alex_dev.id,
      content:
        "Best stack in 2026:\n- boring backend\n- simple frontend\n- AI where it actually helps\n- no hype-driven decisions",
    },
    {
      authorId: byUsername.alex_dev.id,
      content:
        "90% of devs use AI weekly now and somehow deadlines are still missed. Turns out faster coding just means more ambitious bugs.",
    },
    {
      authorId: byUsername.sarah_codes.id,
      content:
        "AI writes ~47% of code on average now. The other 53% is debugging what it wrote.",
    },
    {
      authorId: byUsername.dan_m.id,
      content:
        "We went from 'learn to code' to 'learn to review code written by something else' in like 3 years.",
    },
    {
      authorId: byUsername.elena_design.id,
      content:
        "The hardest part of design used to be execution.\nNow it’s choosing between 50 AI-generated options that are all... kinda mid.",
    },
    {
      authorId: byUsername.marcus_tech.id,
      content:
        "X has ~550M users and ~350M posts per day.\nYour post didn’t flop.\nIt just lost a knife fight.",
    },
    {
      authorId: byUsername.tech_nomad.id,
      content:
        "Remote work, AI tools, global market...\nAnd people still argue tabs vs spaces like it matters.",
    },
    {
      authorId: byUsername.lina_graphics.id,
      content:
        "AI didn’t kill creativity.\nIt exposed how many people never had taste to begin with.",
    },
    {
      authorId: byUsername.nik_devops.id,
      content:
        "96% of teams use AI now.\n63% still don’t trust it fully.\nThat’s the entire industry in one sentence.",
    },
    {
      authorId: byUsername.coder_cat.id,
      content:
        "AI: writes 200 lines instantly\nme: spends 2 hours understanding line 37",
    },
    {
      authorId: byUsername.alex_dev.id,
      content:
        "The real skill in 2026 isn’t coding.\nIt’s knowing what NOT to delegate to AI.",
    },
    {
      authorId: byUsername.sarah_codes.id,
      content:
        "Half of programming tokens globally are still not code.\nTurns out devs also use AI to complain, explain, and procrastinate.",
    },
    {
      authorId: byUsername.dan_m.id,
      content:
        "Every startup pitch now:\n'It’s like X but with AI'\nNo explanation required apparently.",
    },
    {
      authorId: byUsername.marcus_tech.id,
      content:
        "AI app usage doubled to ~36B hours in a year.\nWe didn’t adopt AI.\nWe moved in.",
    },
    {
      authorId: byUsername.tech_nomad.id,
      content:
        "Best career advice right now:\nbe the person who can ship without AI\nAND faster with it",
    },
    {
      authorId: byUsername.nik_devops.id,
      content:
        "Nothing scares me more than an AI confidently generating infrastructure configs.",
    },
    {
      authorId: byUsername.lina_graphics.id,
      content:
        "Clients think AI makes things instant.\nIt just makes iteration infinite.",
    },
    {
      authorId: byUsername.elena_design.id,
      content:
        "We replaced blank canvas anxiety with infinite options anxiety.",
    },
    {
      authorId: byUsername.coder_cat.id,
      content:
        "console.log 🤝 AI\nboth telling me things I don’t fully trust",
    },
    {
      authorId: byUsername.marcus_tech.id,
      content:
        "Git pushes up 78% YoY.\nWe are not coding less.\nWe are just committing more chaos faster.",
    },
    {
      authorId: byUsername.alex_dev.id,
      content:
        "Old stack: frontend + backend\nNew stack: frontend + backend + AI + monitoring the AI + fixing the AI",
    },
    {
      authorId: interviewer.id,
      groupId: guestGroup.id,
      content:
        "Welcome to Guest's Group. I made this room so I can try owner tools: posts, chats, and not breaking production. Say hi if you wandered in.",
    },
  ];

  const posts = [];
  for (let i = 0; i < postBlueprints.length; i++) {
    const blueprint = postBlueprints[i];
    const post = await prisma.post.create({
      data: {
        content: blueprint.content,
        media_url: blueprint.media
          ? postMedias[i % postMedias.length]
          : i % 5 === 0
            ? postMedias[i % postMedias.length]
            : null,
        author_id: blueprint.authorId,
        groupId: blueprint.groupId ?? null,
        createdAt: minutesAgo((postBlueprints.length - i) * 12),
      },
    });
    posts.push(post);
  }

  const commentPairs: Array<{ postIndex: number; threads: string[][] }> = [
    {
      postIndex: 0,
      threads: [
        [
          "The TypeScript types matching Prisma is the dream. How are you sharing the types — a package, or just copying?",
          "We generate the client in the backend and import the types in the React app. Not fancy, just works.",
        ],
        ["PostgreSQL plus Prisma is such a calm stack. Nice work."],
      ],
    },
    {
      postIndex: 2,
      threads: [
        [
          "Guilty of copying node_modules once in 2019. Never again.",
          "The image size told on you, Dan still remembers.",
        ],
      ],
    },
    {
      postIndex: 3,
      threads: [
        [
          "CSS Modules forever. BEM naming keeps the file readable.",
          "Same. I can find .card__title without spelunking.",
        ],
      ],
    },
    {
      postIndex: 4,
      threads: [
        [
          "Welcome! Ask anything. We will even explain our worst Git commits.",
          "I will hold you to that. Starting with the Friday deploy.",
        ],
      ],
    },
    {
      postIndex: 14,
      threads: [
        [
          "I start with components and props. State comes after they can render a list.",
          "That matches how I learned React too. State is easier once JSX feels normal.",
        ],
      ],
    },
    {
      postIndex: 25,
      threads: [
        [
          "This. A 7B model with good evals in our domain beats a giant one that hallucinates tickets.",
          "Reliability is the feature. Hype does not page you at 2am.",
        ],
      ],
    },
    {
      postIndex: 26,
      threads: [
        [
          "I used AI to write a flexbox and still opened MDN. No shame.",
          "Centering a div is the original unit test of the web.",
        ],
      ],
    },
    {
      postIndex: 27,
      threads: [
        [
          "Leaderboard model, production model, and the one legal will allow. Three different animals.",
        ],
      ],
    },
    {
      postIndex: 28,
      threads: [
        [
          "The 50% is where the craft still lives. Prompting is the new client call.",
          "I felt this in my Figma layers.",
        ],
      ],
    },
    {
      postIndex: 29,
      threads: [
        [
          "Needed this reminder after posting into the void on a Tuesday.",
        ],
      ],
    },
    {
      postIndex: 30,
      threads: [
        [
          "Jobs first is brutally honest. The rest is branding.",
        ],
      ],
    },
    {
      postIndex: 31,
      threads: [
        [
          "Taste is the new compile error. You feel it before you can name it.",
        ],
      ],
    },
    {
      postIndex: 32,
      threads: [
        [
          "YAML is the real final boss. Models at least answer in English.",
          "I will defend this take in Cloud & Pipelines.",
        ],
      ],
    },
    {
      postIndex: 33,
      threads: [
        [
          "The env var was in the README. The AI did not read the README. Neither did I, for three hours.",
        ],
      ],
    },
    {
      postIndex: 34,
      threads: [
        [
          "At least in 2017 the blog posts lasted a month. These drop before the tweet cools.",
        ],
      ],
    },
    {
      postIndex: 35,
      threads: [
        [
          "One post. One thought. I will not swipe through 27 screens again.",
        ],
      ],
    },
    {
      postIndex: 36,
      threads: [
        [
          "Trust but verify, except skip the trust until the tests pass.",
        ],
      ],
    },
    {
      postIndex: 37,
      threads: [
        [
          "Dead products do not keep this many people arguing. That is the tell.",
        ],
      ],
    },
    {
      postIndex: 38,
      threads: [
        [
          "If I need a legend, I already lost the intern.",
        ],
      ],
    },
    {
      postIndex: 39,
      threads: [
        [
          "Rule 2 is usually named Alex, or Friday deploys.",
        ],
      ],
    },
    {
      postIndex: 40,
      threads: [
        [
          "Bad UI is the low-hanging fruit. Please, AI, take it.",
        ],
      ],
    },
    {
      postIndex: 41,
      threads: [
        [
          "Faster drafts, same opinions. The bottleneck moved to the inbox.",
        ],
      ],
    },
    {
      postIndex: 42,
      threads: [
        [
          "I still sprinkle console.log like catnip. The framework can wait.",
        ],
      ],
    },
    {
      postIndex: 43,
      threads: [
        [
          "Support tickets do not care about parameter counts. They care about the right SKU.",
        ],
      ],
    },
    {
      postIndex: 44,
      threads: [
        [
          "This is the stack I will still want in two years. Boring ages well.",
          "Put it on a sticker.",
        ],
      ],
    },
    {
      postIndex: 45,
      threads: [
        [
          "We estimated in story points and the AI estimated in vibes. Both were wrong.",
        ],
      ],
    },
    {
      postIndex: 46,
      threads: [
        [
          "47% write, 53% 'why is this optional chaining on a boolean'.",
        ],
      ],
    },
    {
      postIndex: 47,
      threads: [
        [
          "Review is the job now. Typing was the easy part and we did not know it.",
        ],
      ],
    },
    {
      postIndex: 48,
      threads: [
        [
          "I picked option 14 because it was slightly less beige. That is the new craft.",
        ],
      ],
    },
    {
      postIndex: 49,
      threads: [
        [
          "Knife fight is the kindest way I have heard 'the algorithm shrugged'.",
        ],
      ],
    },
    {
      postIndex: 50,
      threads: [
        [
          "Spaces. I will die on this hill and it still will not ship the feature.",
        ],
      ],
    },
    {
      postIndex: 51,
      threads: [
        [
          "Harsh and fair. Tools amplify whatever you already bring.",
        ],
      ],
    },
    {
      postIndex: 52,
      threads: [
        [
          "Use it, distrust it, ship anyway. That is the workflow.",
        ],
      ],
    },
    {
      postIndex: 53,
      threads: [
        [
          "Line 37 was a clever helper. Too clever. I miss boring code.",
        ],
      ],
    },
    {
      postIndex: 54,
      threads: [
        [
          "If I cannot explain it without the model, I should not merge it.",
        ],
      ],
    },
    {
      postIndex: 55,
      threads: [
        [
          "The complain-explain-procrastinate loop is my actual IDE.",
        ],
      ],
    },
    {
      postIndex: 56,
      threads: [
        [
          "I have heard this pitch four times this week. The X was always Slack.",
        ],
      ],
    },
    {
      postIndex: 57,
      threads: [
        [
          "36B hours is not a tool. That is a roommate.",
        ],
      ],
    },
    {
      postIndex: 58,
      threads: [
        [
          "Without it you understand the system. With it you ship before lunch. Need both.",
        ],
      ],
    },
    {
      postIndex: 59,
      threads: [
        [
          "It will `apply` with perfect confidence. That is the horror.",
          "Terraform plus vibes is how we get surprise bills.",
        ],
      ],
    },
    {
      postIndex: 60,
      threads: [
        [
          "Infinite iteration is just 12 rounds of feedback wearing a hoodie.",
        ],
      ],
    },
    {
      postIndex: 61,
      threads: [
        [
          "Blank canvas was scary. Fifty mid options is a different kind of stuck.",
        ],
      ],
    },
    {
      postIndex: 62,
      threads: [
        [
          "Both are optimistic. I respect the energy, not the accuracy.",
        ],
      ],
    },
    {
      postIndex: 63,
      threads: [
        [
          "More commits is not more progress. Sometimes it is just more undo.",
        ],
      ],
    },
    {
      postIndex: 64,
      threads: [
        [
          "The monitoring-the-AI layer is the new on-call. Congrats to us.",
          "Add 'explaining the AI to the client' and the stack is complete.",
        ],
      ],
    },
    {
      postIndex: 65,
      threads: [
        [
          "Nice room. Owner tools are easier to demo when you actually own the group.",
          "That is the idea. If I break something, it is my group.",
        ],
      ],
    },
  ];

  console.log("Adding comments and likes...");
  for (const post of posts) {
    for (const user of users) {
      if (Math.random() > 0.45) {
        await prisma.postLike.create({
          data: { post_id: post.id, user_id: user.id },
        });
      }
      if (Math.random() > 0.8) {
        await prisma.bookmark.create({
          data: { post_id: post.id, user_id: user.id },
        });
      }
    }
  }

  for (const pair of commentPairs) {
    const post = posts[pair.postIndex];
    for (const thread of pair.threads) {
      const parent = await prisma.comment.create({
        data: {
          content: thread[0],
          author_id: users[pair.postIndex % users.length].id,
          post_id: post.id,
        },
      });
      if (thread[1]) {
        await prisma.comment.create({
          data: {
            content: thread[1],
            author_id: interviewer.id,
            post_id: post.id,
            sub_comment_id: parent.id,
          },
        });
      }
    }
  }

  await prisma.groupInvite.create({
    data: {
      groupId: frontendFriday.id,
      invitedById: byUsername.elena_design.id,
      inviteeId: interviewer.id,
    },
  });

  console.log("Creating direct conversations with the guest interviewer...");

  type ChatLine = { from: string; text: string; minutesAgo: number };

  const startDirectChat = async (otherUserId: string, lines: ChatLine[]) => {
    const chat = await prisma.chat.create({
      data: {
        user1_id: INTERVIEWER_ID,
        user2_id: otherUserId,
      },
    });
    await prisma.message.createMany({
      data: lines.map((line) => ({
        content: line.text,
        senderId: line.from,
        chat_id: chat.id,
        createdAt: minutesAgo(line.minutesAgo),
      })),
    });
  };

  await startDirectChat(byUsername.alex_dev.id, [
    {
      from: INTERVIEWER_ID,
      text: "Hey Alex — I logged in as the guest interviewer. Can you walk me through how GitX is structured?",
      minutesAgo: 180,
    },
    {
      from: byUsername.alex_dev.id,
      text: "Welcome! Frontend is React + TypeScript. Backend is Node, Express, and PostgreSQL through Prisma. Keep API and UI separate — that is the whole idea.",
      minutesAgo: 178,
    },
    {
      from: INTERVIEWER_ID,
      text: "Nice. Where should I look first if I want to understand login?",
      minutesAgo: 176,
    },
    {
      from: byUsername.alex_dev.id,
      text: "AuthController and the GitHub passport setup. Guest login is the special path that finds your user id and calls req.login.",
      minutesAgo: 174,
    },
    {
      from: INTERVIEWER_ID,
      text: "Got it. I also joined The Production Breaking Squad. Is that the main group?",
      minutesAgo: 170,
    },
    {
      from: byUsername.alex_dev.id,
      text: "That one is the loud group. Frontend Friday is calmer. Cloud & Pipelines is where Dan and Nik argue about Terraform.",
      minutesAgo: 168,
    },
    {
      from: INTERVIEWER_ID,
      text: "Perfect. I will read a few posts and then ask Elena about the CSS Modules setup.",
      minutesAgo: 165,
    },
    {
      from: byUsername.alex_dev.id,
      text: "Do that. And if Prisma types confuse you, ping me. We generate the client into Backend/src/generated/prisma.",
      minutesAgo: 163,
    },
  ]);

  await startDirectChat(byUsername.elena_design.id, [
    {
      from: INTERVIEWER_ID,
      text: "Elena, your Frontend Friday post about CSS Modules — is that how the profile modal is built?",
      minutesAgo: 140,
    },
    {
      from: byUsername.elena_design.id,
      text: "Yes. Each component sits in its own folder with a .module.css file. We use BEM names like .card and .card__title so the CSS stays obvious.",
      minutesAgo: 138,
    },
    {
      from: INTERVIEWER_ID,
      text: "And skills on the profile — those checkboxes come from skillGroups.ts, right?",
      minutesAgo: 136,
    },
    {
      from: byUsername.elena_design.id,
      text: "Exactly. Languages, databases, React, Node.js, Docker, all of that list. Custom skills can still be typed in, but the catalog is the default.",
      minutesAgo: 134,
    },
    {
      from: INTERVIEWER_ID,
      text: "That helps. I set my tags to TypeScript, React, Node.js, Express, PostgreSQL. Did I pick a sensible stack for this app?",
      minutesAgo: 132,
    },
    {
      from: byUsername.elena_design.id,
      text: "That is literally the stack. You will feel at home. Come to Frontend Friday if you want to talk through the Edit Profile modal.",
      minutesAgo: 130,
    },
  ]);

  await startDirectChat(byUsername.dan_m.id, [
    {
      from: INTERVIEWER_ID,
      text: "Dan, I am in Cloud & Pipelines. What is the one DevOps habit you wish every intern already knew?",
      minutesAgo: 120,
    },
    {
      from: byUsername.dan_m.id,
      text: "Read the Dockerfile. Then read the GitHub Actions file. If you cannot explain how the image gets to Kubernetes, you do not understand the deploy.",
      minutesAgo: 118,
    },
    {
      from: INTERVIEWER_ID,
      text: "We are local-only here though, right? PostgreSQL and Prisma migrate?",
      minutesAgo: 116,
    },
    {
      from: byUsername.dan_m.id,
      text: "For GitX, yes. Still treat .env like production. Never commit secrets. And do not docker compose down -v unless you mean to wipe the database.",
      minutesAgo: 114,
    },
    {
      from: INTERVIEWER_ID,
      text: "Understood. I will not wipe the database on purpose. Seeding exists for a reason.",
      minutesAgo: 112,
    },
    {
      from: byUsername.dan_m.id,
      text: "Good. If seed fails, it is usually leftover rows. We delete messages first, then chats, then users. Order matters because of foreign keys.",
      minutesAgo: 110,
    },
  ]);

  await startDirectChat(byUsername.sarah_codes.id, [
    {
      from: INTERVIEWER_ID,
      text: "Sarah — if I follow a post from the feed to the API, which route should I open first?",
      minutesAgo: 100,
    },
    {
      from: byUsername.sarah_codes.id,
      text: "Start with the posts router, then the controller. Express just maps HTTP to functions. Prisma does the PostgreSQL work. Keep that split in your head.",
      minutesAgo: 98,
    },
    {
      from: INTERVIEWER_ID,
      text: "Do you write tests for the controllers?",
      minutesAgo: 96,
    },
    {
      from: byUsername.sarah_codes.id,
      text: "I would. Unit Testing the Prisma calls with a test database is the honest way. Right now the seed data is how we demo the happy path.",
      minutesAgo: 94,
    },
    {
      from: INTERVIEWER_ID,
      text: "Okay. I will click around as the guest user and note anything that 404s.",
      minutesAgo: 92,
    },
    {
      from: byUsername.sarah_codes.id,
      text: "Please do. Guest login only works if this seed ran. If you ever see 'Guest account not found', that is this user id missing.",
      minutesAgo: 90,
    },
  ]);

  await startDirectChat(byUsername.clara_van.id, [
    {
      from: INTERVIEWER_ID,
      text: "Clara, how do you want feedback from a guest pass? Issues, chat, or comments on posts?",
      minutesAgo: 80,
    },
    {
      from: byUsername.clara_van.id,
      text: "Comments on posts if it is product. Direct chat if it is confusing UX. Groups if everyone should hear it. Keep it human.",
      minutesAgo: 78,
    },
    {
      from: INTERVIEWER_ID,
      text: "I already left a note in Production Breaking Squad. Was that the right room?",
      minutesAgo: 76,
    },
    {
      from: byUsername.clara_van.id,
      text: "Yes. That group is the 'whole company' room. Frontend Friday is the craft room. Either is fine.",
      minutesAgo: 74,
    },
    {
      from: INTERVIEWER_ID,
      text: "Thanks. I will keep the tone curious, not 'this is broken' unless it actually is.",
      minutesAgo: 72,
    },
    {
      from: byUsername.clara_van.id,
      text: "That is all we ask. Agile / Scrum is just a calendar for conversations like this.",
      minutesAgo: 70,
    },
  ]);

  await startDirectChat(byUsername.tech_nomad.id, [
    {
      from: INTERVIEWER_ID,
      text: "James, your Node + Express + PostgreSQL post felt like this repo. Are you following the same PERN idea?",
      minutesAgo: 60,
    },
    {
      from: byUsername.tech_nomad.id,
      text: "Same idea. PostgreSQL, Express, React, Node. I skip extra frameworks unless someone makes me. GitX is a good example of staying boring.",
      minutesAgo: 58,
    },
    {
      from: INTERVIEWER_ID,
      text: "Any trap you hit with REST APIs and React state?",
      minutesAgo: 56,
    },
    {
      from: byUsername.tech_nomad.id,
      text: "Fetching in two pages and getting two different shapes. Put the type in one place. Trust the backend JSON, then map it once.",
      minutesAgo: 54,
    },
    {
      from: INTERVIEWER_ID,
      text: "I will check Profile and Edit Profile against the same user object.",
      minutesAgo: 52,
    },
    {
      from: byUsername.tech_nomad.id,
      text: "Good plan. If tags look empty, the seed used to use slugs like 'nextjs'. Now they match the catalog: Next.js, TypeScript, and so on.",
      minutesAgo: 50,
    },
  ]);

  await startDirectChat(byUsername.marcus_tech.id, [
    {
      from: INTERVIEWER_ID,
      text: "Marcus, your Linux/C post was intense. How do you debug when logs are just numbers?",
      minutesAgo: 48,
    },
    {
      from: byUsername.marcus_tech.id,
      text: "Reproduce on a small C program first. Then add prints. Then strace if it is a syscall. Docker can hide that, so I still keep a Linux VM around.",
      minutesAgo: 46,
    },
    {
      from: INTERVIEWER_ID,
      text: "Should I learn Bash before Docker, or Docker first?",
      minutesAgo: 44,
    },
    {
      from: byUsername.marcus_tech.id,
      text: "Bash first. Docker is a box. If you cannot run the command outside the box, the box will not save you.",
      minutesAgo: 42,
    },
    {
      from: INTERVIEWER_ID,
      text: "Fair. I will practice quoting variables like you said in Cloud & Pipelines.",
      minutesAgo: 40,
    },
    {
      from: byUsername.marcus_tech.id,
      text: "Do that and you will already be ahead of half the internet.",
      minutesAgo: 38,
    },
  ]);

  await startDirectChat(byUsername.lina_graphics.id, [
    {
      from: INTERVIEWER_ID,
      text: "Lina, you mentioned React re-renders. How do I see them without guessing?",
      minutesAgo: 36,
    },
    {
      from: byUsername.lina_graphics.id,
      text: "React DevTools Profiler. Record a click, look at what committed. If a whole tree lights up for a tiny state change, that is the smell.",
      minutesAgo: 34,
    },
    {
      from: INTERVIEWER_ID,
      text: "Is TypeScript helping or getting in the way for that?",
      minutesAgo: 32,
    },
    {
      from: byUsername.lina_graphics.id,
      text: "Helping. If props are typed, you stop passing extra stuff 'just in case'. Extra props often mean extra renders.",
      minutesAgo: 30,
    },
    {
      from: INTERVIEWER_ID,
      text: "I will profile the profile page. Meta.",
      minutesAgo: 28,
    },
    {
      from: byUsername.lina_graphics.id,
      text: "Please. If CSS animation is on the left and JS on the right, keep animation in CSS. The main thread has enough jobs.",
      minutesAgo: 26,
    },
  ]);

  await startDirectChat(byUsername.nik_devops.id, [
    {
      from: INTERVIEWER_ID,
      text: "Nik, Terraform vs clicking in the AWS console — where should a guest start?",
      minutesAgo: 24,
    },
    {
      from: byUsername.nik_devops.id,
      text: "Click once to learn the names. Then Terraform so you can repeat it. GitHub Actions can run terraform plan so humans review before apply.",
      minutesAgo: 22,
    },
    {
      from: INTERVIEWER_ID,
      text: "We also have Azure on your skills. Is it the same ideas?",
      minutesAgo: 20,
    },
    {
      from: byUsername.nik_devops.id,
      text: "Same movie, different subtitles. Resource groups instead of whatever AWS called it this week. CI/CD still has to be the adult in the room.",
      minutesAgo: 18,
    },
    {
      from: INTERVIEWER_ID,
      text: "I will stay on GitHub Actions for GitX. Local first.",
      minutesAgo: 16,
    },
    {
      from: byUsername.nik_devops.id,
      text: "Correct. Docker Compose is the whole cloud until it is not. Come back to Kubernetes when one box is not enough.",
      minutesAgo: 14,
    },
  ]);

  await startDirectChat(byUsername.coder_cat.id, [
    {
      from: INTERVIEWER_ID,
      text: "Milo, I liked the unit test post. Do you actually run tests before you push?",
      minutesAgo: 40,
    },
    {
      from: byUsername.coder_cat.id,
      text: "I try. Then I sit on the laptop and GitHub Actions has to be the adult. Unit Testing is how I apologize to future me.",
      minutesAgo: 38,
    },
    {
      from: INTERVIEWER_ID,
      text: "If I break seed, will you notice?",
      minutesAgo: 36,
    },
    {
      from: byUsername.coder_cat.id,
      text: "I will notice because guest login stops working and I cannot knock over production with my paws. Please keep my user in the groups.",
      minutesAgo: 34,
    },
    {
      from: INTERVIEWER_ID,
      text: "You are in Frontend Friday with me. I will not remove you.",
      minutesAgo: 32,
    },
    {
      from: byUsername.coder_cat.id,
      text: "Purr. That is a merge I can approve.",
      minutesAgo: 28,
    },
  ]);

  console.log("Creating group chats with full threads...");

  const productionChat = await prisma.groupChat.create({
    data: {
      groupId: productionSquad.id,
      name: "Squad stand-up",
      description: "Daily chatter for The Production Breaking Squad.",
    },
  });

  await prisma.message.createMany({
    data: [
      {
        senderId: byUsername.alex_dev.id,
        group_chat_id: productionChat.id,
        content:
          "Stand-up: TypeScript API is green, React feed is loading, PostgreSQL is happy. Guest interviewer is in the room — say hi.",
        createdAt: minutesAgo(90),
      },
      {
        senderId: INTERVIEWER_ID,
        group_chat_id: productionChat.id,
        content:
          "Hi all. I am gitx_guest. I will mostly listen. If I ask a dumb question about Express routes, that is on purpose.",
        createdAt: minutesAgo(88),
      },
      {
        senderId: byUsername.sarah_codes.id,
        group_chat_id: productionChat.id,
        content:
          "Welcome. Dumb questions are how we find the missing try/catch. Ask away.",
        createdAt: minutesAgo(86),
      },
      {
        senderId: byUsername.dan_m.id,
        group_chat_id: productionChat.id,
        content:
          "Also please do not click deploy unless Alex says so. Kubernetes is napping.",
        createdAt: minutesAgo(84),
      },
      {
        senderId: byUsername.clara_van.id,
        group_chat_id: productionChat.id,
        content:
          "Agenda is feed, profile skills, then messaging. Guest, if anything feels fake, tell us. Seed data used to be joke posts.",
        createdAt: minutesAgo(82),
      },
      {
        senderId: INTERVIEWER_ID,
        group_chat_id: productionChat.id,
        content:
          "The new posts look like real engineering notes. That helps. I will reply in Frontend Friday next.",
        createdAt: minutesAgo(80),
      },
      {
        senderId: byUsername.tech_nomad.id,
        group_chat_id: productionChat.id,
        content:
          "If you want a tour of a small Express handler, I can screen-share later. Node is not scary once you see one route.",
        createdAt: minutesAgo(78),
      },
      {
        senderId: byUsername.coder_cat.id,
        group_chat_id: productionChat.id,
        content: "I knocked a test over. It was me. Not production. Probably.",
        createdAt: minutesAgo(76),
      },
      {
        senderId: byUsername.alex_dev.id,
        group_chat_id: productionChat.id,
        content:
          "We will check GitHub Actions. Guest, ignore the cat. We ship when CI is green.",
        createdAt: minutesAgo(74),
      },
    ],
  });

  const frontendChat = await prisma.groupChat.create({
    data: {
      groupId: frontendFriday.id,
      name: "Friday critique",
      description: "UI, CSS Modules, and React notes.",
    },
  });

  await prisma.message.createMany({
    data: [
      {
        senderId: byUsername.elena_design.id,
        group_chat_id: frontendChat.id,
        content:
          "Today: Edit Profile skills. Catalog is in skillGroups.ts. Guest, your checkboxes should match what you see on other profiles.",
        createdAt: minutesAgo(70),
      },
      {
        senderId: INTERVIEWER_ID,
        group_chat_id: frontendChat.id,
        content:
          "They do now. I see TypeScript, React, Node.js — not 'typescript' in lowercase. That was confusing yesterday.",
        createdAt: minutesAgo(68),
      },
      {
        senderId: byUsername.lina_graphics.id,
        group_chat_id: frontendChat.id,
        content:
          "The names have to match exactly or the checkbox will not look selected. catalogSkills.includes is picky, which is good.",
        createdAt: minutesAgo(66),
      },
      {
        senderId: byUsername.alex_dev.id,
        group_chat_id: frontendChat.id,
        content:
          "Same strings in the database as in the UI. Seed was the last place still using slugs. Fixed.",
        createdAt: minutesAgo(64),
      },
      {
        senderId: byUsername.lina_graphics.id,
        group_chat_id: frontendChat.id,
        content:
          "While we are here: the modal uses CSS Modules. If a class does not apply, you imported the wrong file. Happens to me weekly.",
        createdAt: minutesAgo(62),
      },
      {
        senderId: INTERVIEWER_ID,
        group_chat_id: frontendChat.id,
        content:
          "I will open EditProfileModal.tsx and the module CSS side by side. If I get stuck, I will ping this chat instead of guessing.",
        createdAt: minutesAgo(60),
      },
      {
        senderId: byUsername.elena_design.id,
        group_chat_id: frontendChat.id,
        content:
          "Please do. We would rather answer than watch someone fight BEM for an hour.",
        createdAt: minutesAgo(58),
      },
    ],
  });

  const cloudChat = await prisma.groupChat.create({
    data: {
      groupId: cloudRoom.id,
      name: "On-call corner",
      description: "Docker, CI/CD, and 'is prod on fire?'",
    },
  });

  await prisma.message.createMany({
    data: [
      {
        senderId: byUsername.dan_m.id,
        group_chat_id: cloudChat.id,
        content:
          "On-call corner is open. Guest is here too. No actual fire. Just opinions about Docker.",
        createdAt: minutesAgo(55),
      },
      {
        senderId: INTERVIEWER_ID,
        group_chat_id: cloudChat.id,
        content:
          "I only know Docker from tutorials. What is the GitX-sized version? Do we even need Kubernetes?",
        createdAt: minutesAgo(53),
      },
      {
        senderId: byUsername.nik_devops.id,
        group_chat_id: cloudChat.id,
        content:
          "For this app? A Compose file and PostgreSQL is enough. Kubernetes is how we talk about later. Terraform is how we would talk to AWS if we had AWS.",
        createdAt: minutesAgo(51),
      },
      {
        senderId: byUsername.marcus_tech.id,
        group_chat_id: cloudChat.id,
        content:
          "Linux still matters. If the container dies, you read logs like a human. Bash one-liners beat guessing in the UI.",
        createdAt: minutesAgo(49),
      },
      {
        senderId: byUsername.sarah_codes.id,
        group_chat_id: cloudChat.id,
        content:
          "And keep FastAPI/Django talk in posts. This room is images, pipelines, and GitHub Actions. I will still complain about indexes though.",
        createdAt: minutesAgo(47),
      },
      {
        senderId: INTERVIEWER_ID,
        group_chat_id: cloudChat.id,
        content:
          "That split makes sense. I will keep React questions in Frontend Friday and Docker questions here.",
        createdAt: minutesAgo(45),
      },
      {
        senderId: byUsername.nik_devops.id,
        group_chat_id: cloudChat.id,
        content:
          "If CI/CD is red, paste the job name. GitHub Actions logs are long but the first failed step is usually the whole story.",
        createdAt: minutesAgo(43),
      },
      {
        senderId: byUsername.dan_m.id,
        group_chat_id: cloudChat.id,
        content:
          "Deal. Guest, you are cleared to ask 'why is this YAML'. We all asked that once.",
        createdAt: minutesAgo(41),
      },
    ],
  });

  const guestChat = await prisma.groupChat.create({
    data: {
      groupId: guestGroup.id,
      name: "Guest lounge",
      description: "Chat for Guest's Group. The guest interviewer owns this one.",
    },
  });

  await prisma.message.createMany({
    data: [
      {
        senderId: INTERVIEWER_ID,
        group_chat_id: guestChat.id,
        content:
          "This is my group. I am the owner here, so I can try settings without asking Alex first.",
        createdAt: minutesAgo(30),
      },
      {
        senderId: byUsername.alex_dev.id,
        group_chat_id: guestChat.id,
        content: "Good sandbox. If you can create a post here, owner tools are working.",
        createdAt: minutesAgo(28),
      },
      {
        senderId: byUsername.elena_design.id,
        group_chat_id: guestChat.id,
        content: "Banner and avatar look like a real group now. Welcome, boss.",
        createdAt: minutesAgo(26),
      },
      {
        senderId: byUsername.coder_cat.id,
        group_chat_id: guestChat.id,
        content: "I will not sit on the keyboard. Probably.",
        createdAt: minutesAgo(24),
      },
    ],
  });

  console.log("Seed finished. Guest interviewer id:", INTERVIEWER_ID);
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
