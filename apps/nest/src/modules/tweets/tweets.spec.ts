// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { UsersService } from '@modules/users/users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from '../comments/comments.service';
import { PrismaService } from '../prisma/prisma.service';
import { TweetsService } from './tweets.service';
import { NotFoundException } from '@nestjs/common';

const serviceMock = () => ({
  $queryRaw: jest.fn(),
  create: jest.fn(),
  getCommentsByTweetId: jest.fn(),
});

describe('TweetsService', () => {
  let service: TweetsService;
  let prismaService: typeof serviceMock;
  let commentService: typeof serviceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TweetsService,
        {
          provide: CommentsService,
          useValue: serviceMock(),
        },
        {
          provide: PrismaService,
          useValue: serviceMock(),
        },
        {
          provide: UsersService,
          useValue: serviceMock(),
        },
      ],
    }).compile();

    service = module.get<TweetsService>(TweetsService);
    prismaService = module.get(PrismaService);
    commentService = module.get(CommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTweetById', () => {
    describe('when tweet with ID exists', () => {
      it('should return the tweet object', async () => {
        const expectedTweet = { comments: [], tweet: {} };

        prismaService.$queryRaw.mockReturnValue([{}]);
        commentService.getCommentsByTweetId.mockReturnValue([]);
        const tweet = await service.getTweetById(1);
        expect(tweet).toEqual(expectedTweet);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async (done) => {
        try {
          prismaService.$queryRaw.mockReturnValue([]);
          commentService.getCommentsByTweetId.mockReturnValue([]);
          await service.getTweetById(1);
          done();
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toEqual(`Tweet not found`);
        }
      });
    });
  });
});
