import { prisma } from "../Backend/src/lib/prisma";

async function main() {
  console.log("🚀 Starting highly comprehensive database seeding...");

  // 1. CLEAN DATABASE (Order respects relations to avoid foreign key violations)
  console.log("🧹 Cleaning old data...");
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

  // 2. REALISTIC IMAGE POOLS (Unsplash production-ready URLs)
  const profilePics = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1398938026231-efc53fed93a4?w=500&auto=format&fit=crop&q=80",
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

  const postMedias = [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&auto=format&fit=crop&q=80",
  ];

  // 3. CREATE USERS
  console.log("👥 Mocking extensive user database...");
  const userData = [
    {
      username: "alex_dev",
      name: "Alex Rivera",
      bio: "Senior Full Stack Engineer | Open Source Enthusiast | Rust & TypeScript",
      tags: ["typescript", "rust", "nextjs"],
      socials: ["github.com/alex_dev", "twitter.com/alex_codes"],
    },
    {
      username: "sarah_codes",
      name: "Sarah Chen",
      bio: "AI researcher & Pythonista. Building the future of neural interfaces.",
      tags: ["python", "pytorch", "ai"],
      socials: ["github.com/sarah_codes"],
    },
    {
      username: "dan_m",
      name: "Dan Murphy",
      bio: "DevOps wizard. Docker, K8s, and automation addict.",
      tags: ["docker", "kubernetes", "aws"],
      socials: ["github.com/dan_m"],
    },
    {
      username: "elena_design",
      name: "Elena Rostova",
      bio: "UI/UX Designer turned Frontend Developer. Making things beautiful and functional.",
      tags: ["css", "figma", "react"],
      socials: ["github.com/elena_design", "linkedin.com/in/elena"],
    },
    {
      username: "marcus_tech",
      name: "Marcus Johnson",
      bio: "Cybersecurity expert | Ethical Hacker | Linux kernel tinkerer.",
      tags: ["linux", "security", "c"],
      socials: ["github.com/marcus_tech"],
    },
    {
      username: "clara_van",
      name: "Clara Vance",
      bio: "Product Manager who actually knows how to git commit.",
      tags: ["agile", "git", "management"],
      socials: ["github.com/clara_van"],
    },
    {
      username: "tech_nomad",
      name: "James Wilson",
      bio: "Remote worker traveling Asia. Building SaaS products micro-style.",
      tags: ["saas", "indiehackers", "nodejs"],
      socials: ["github.com/tech_nomad"],
    },
    {
      username: "lina_graphics",
      name: "Lina G",
      bio: "WebGL, WebGPU, and 3D graphics on the web.",
      tags: ["webgl", "threejs", "javascript"],
      socials: ["github.com/lina_graphics"],
    },
    {
      username: "nik_devops",
      name: "Nikolai Tesla",
      bio: "Infrastructure engineer. Automated pipelines are my poetry.",
      tags: ["ci-cd", "github-actions", "terraform"],
      socials: ["github.com/nik_devops"],
    },
    {
      username: "coder_cat",
      name: "Milo Cat",
      bio: "Meow. I step on keyboards and push straight to production.",
      tags: ["testing", "bugs", "purr"],
      socials: ["github.com/coder_cat"],
    },
  ];

  const users = [];
  for (let i = 0; i < userData.length; i++) {
    const data = userData[i];
    const u = await prisma.user.create({
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
    users.push(u);
  }

  // 4. GRAPH RELATIONSHIPS (Follow Network)
  console.log("🤝 Establishing dense follower network...");
  for (const follower of users) {
    for (const following of users) {
      if (follower.id !== following.id) {
        // High probability connection to simulate dense real-world social graphs
        if (Math.random() > 0.3) {
          await prisma.follows
            .create({
              data: {
                follower_id: follower.id,
                following_id: following.id,
              },
            })
            .catch(() => {}); // catch safely in case of race conditions
        }
      }
    }
  }

  // 5. POSTS AND GROUPS INCEPTION
  console.log("📝 Creating standard and group communities/posts...");
  const techGroup = await prisma.group.create({
    data: {
      group_name: "The Production Breaking Squad",
      creator_id: users[0].id,
      members: { connect: users.map((u) => ({ id: u.id })) },
    },
  });

  const postContents = [
    "Just migrated my entire backend architecture to Prisma and Postgres. The speed boost is absolutely insane! 🔥",
    "Does anyone else get existential dread when they see 47 merge conflicts on a Friday afternoon?",
    "Writing documentation is just apologizing to your future self for actions your present self took.",
    "Spent 4 hours debugging a typo. Yes, a single misplaced semicolon. Please send help and coffee.",
    "Check out this stunning dark-theme terminal setup I configured today!",
    "Hot take: CSS is an engineering art form. Changing my mind is impossible.",
    "Is Kubernetes overkill for a static portfolio site? Asking for a friend who loves overengineering.",
    "Open source contribution feels amazing. Just had my first major PR merged into a core library!",
    "Remember: Clean code reads like well-written prose. Keep your variables descriptive, team.",
    "Nothing screams morning productivity like production crashes due to an unhandled exception.",
  ];

  const posts = [];
  for (let i = 0; i < 25; i++) {
    const author = users[i % users.length];
    const isGroupPost = i % 4 === 0;

    const post = await prisma.post.create({
      data: {
        content: postContents[i % postContents.length] + ` (Post #${i + 1})`,
        media_url: i % 3 === 0 ? postMedias[i % postMedias.length] : null,
        author_id: author.id,
        groupId: isGroupPost ? techGroup.id : null,
      },
    });
    posts.push(post);
  }

  // 6. INTERACTIONS (Likes, Bookmarks, Comments, Sub-comments)
  console.log(
    "💬 Distributing massive social engagement (Likes, Comments, & Nested Threads)...",
  );
  const commentTexts = [
    "Completely agree with this!",
    "Wait, have you benchmarked this against native drivers?",
    "This is a certified classic developer moment.",
    "Can you share your configuration files for this?",
    "Legendary post right here.",
    "I feel personally attacked by this statement 😂",
    "What extension are you using for those colors?",
    "This saved my deployment today, thanks for sharing!",
  ];

  for (const post of posts) {
    // Distribute user likes
    for (const user of users) {
      if (Math.random() > 0.4) {
        await prisma.postLike
          .create({
            data: { post_id: post.id, user_id: user.id },
          })
          .catch(() => {});
      }
      if (Math.random() > 0.7) {
        await prisma.bookmark
          .create({
            data: { post_id: post.id, user_id: user.id },
          })
          .catch(() => {});
      }
    }

    // Top level comments
    const topComments = [];
    for (let c = 0; c < 3; c++) {
      const commenter = users[(posts.indexOf(post) + c) % users.length];
      const comment = await prisma.comment.create({
        data: {
          content:
            commentTexts[(posts.indexOf(post) + c) % commentTexts.length],
          author_id: commenter.id,
          post_id: post.id,
        },
      });
      topComments.push(comment);

      // Distribute comment likes
      for (const user of users) {
        if (Math.random() > 0.5) {
          await prisma.commentLike
            .create({
              data: { comment_id: comment.id, user_id: user.id },
            })
            .catch(() => {});
        }
      }
    }

    // Nested Child Sub-comments (Replies)
    for (const parent of topComments) {
      if (Math.random() > 0.3) {
        const replier = users[Math.floor(Math.random() * users.length)];
        const reply = await prisma.comment.create({
          data: {
            content: `Replying to @${parent.id.substring(0, 4)}: Absolute facts. Couldn't have put it better myself.`,
            author_id: replier.id,
            post_id: post.id,
            sub_comment_id: parent.id,
          },
        });

        // Nested Likes
        if (Math.random() > 0.5) {
          await prisma.commentLike
            .create({
              data: { comment_id: reply.id, user_id: users[0].id },
            })
            .catch(() => {});
        }
      }
    }
  }

  // 7. INVITATIONS & MESSAGES (Group and Direct Messaging System)
  console.log(
    "✉️ Populating active group messaging infrastructure and direct chats...",
  );

  // Create an explicit invite
  await prisma.groupInvite.create({
    data: {
      groupId: techGroup.id,
      invitedById: users[0].id,
      inviteeId: users[1].id,
    },
  });

  // Direct Chats & Messages
  for (let m = 0; m < users.length - 1; m += 2) {
    const u1 = users[m];
    const u2 = users[m + 1];

    const chat = await prisma.chat.create({
      data: { user1_id: u1.id, user2_id: u2.id },
    });

    await prisma.message.createMany({
      data: [
        {
          content: "Hey, did you look over that bug report?",
          senderId: u1.id,
          chat_id: chat.id,
        },
        {
          content:
            "Yeah, reviewing it right now. Looks like an edge case in the parsing script.",
          senderId: u2.id,
          chat_id: chat.id,
        },
        {
          content: "Awesome! Let me know when the fix is deployed.",
          senderId: u1.id,
          chat_id: chat.id,
        },
      ],
    });
  }

  // Group Chats
  const groupChatObj = await prisma.groupChat.create({
    data: { groupId: techGroup.id },
  });

  await prisma.message.createMany({
    data: [
      {
        content: "Welcome to the core team room everyone!",
        senderId: users[0].id,
        group_chat_id: groupChatObj.id,
      },
      {
        content: "Glad to be here. Let’s ship some feature branches!",
        senderId: users[1].id,
        group_chat_id: groupChatObj.id,
      },
      {
        content: "Is production up? I see error rates spiking.",
        senderId: users[2].id,
        group_chat_id: groupChatObj.id,
      },
      {
        content: "False alarm, fixing it live on main!",
        senderId: users[0].id,
        group_chat_id: groupChatObj.id,
      },
    ],
  });

  console.log(
    "✅ Success! Seed completed flawlessly. Database is fully populated with rich social records.",
  );
}

main()
  .catch((e) => {
    console.error("❌ Seeding process hit an unexpected hurdle:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
