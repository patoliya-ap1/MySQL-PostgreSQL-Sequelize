import { Request, Response } from "express";
import { Op } from "sequelize";
import { SocialPostModel } from "../../model/index";
import { sequelize } from "../../config/db.config";

//  Tech posts
export const getTechPosts = async (req: Request, res: Response) => {
  const posts = await SocialPostModel.findAll({
    where: {
      tags: { [Op.contains]: ["tech"] },
    },
  });
  res.json(posts);
};

//  Full-text search
export const searchPosts = async (req: Request, res: Response) => {
  const { q } = req.query;

  const result = await sequelize.query(
    `
    SELECT * FROM "social-posts"
    WHERE to_tsvector('english', content) @@ to_tsquery(:q)
  `,
    {
      replacements: { q },
    },
  );

  res.json(result[0]);
};

//  Rank users
export const rankUsers = async (req: Request, res: Response) => {
  const result = await sequelize.query(`
    SELECT 
      u.id,
      u.name,
      COUNT(p.id) as post_count,
      RANK() OVER (ORDER BY COUNT(p.id) DESC) as rank
    FROM "social-users" u
    LEFT JOIN "social-posts" p ON u.id = p."userId"
    GROUP BY u.id
  `);

  res.json(result[0]);
};

//  Top posts
export const topPosts = async (req: Request, res: Response) => {
  const result = await sequelize.query(`
    SELECT 
      p.id,
      p.content,
      COUNT(l.id) as total_likes
    FROM "social-posts" p
    LEFT JOIN "social-likes" l ON p.id = l."postId"
    GROUP BY p.id
    ORDER BY total_likes DESC
    LIMIT 5
  `);

  res.json(result[0]);
};

// Previous posts (LAG)
export const previousPosts = async (req: Request, res: Response) => {
  const result = await sequelize.query(`
    SELECT 
      id,
      "userId",
      content,
      "createdAt",
      LAG(content) OVER (
        PARTITION BY "userId"
        ORDER BY "createdAt"
      ) as previous_post
    FROM "social-posts"
  `);

  res.json(result[0]);
};
