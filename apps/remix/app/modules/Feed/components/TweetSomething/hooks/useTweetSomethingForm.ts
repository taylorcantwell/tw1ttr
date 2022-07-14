import { useMethods } from 'react-use';

type ReplyPermissions = 'EVERYONE' | 'FOLLOWERS';
type SetContentArgs = { content: string; errors: { content: string } };

export function useTweetSomethingForm() {
  const [tweetSomethingFormData, actions] = useMethods(tweetSomethingReducer, {
    content: '',
    replyPermissions: 'EVERYONE',
    errors: { content: '' },
  });

  const tweetCharacterCount = tweetSomethingFormData.content.length;

  function setContent(value: string) {
    if (tweetCharacterCount === 50) {
      return null;
    }

    actions.setContent({
      content: value,
      errors: {
        content: validateContent(value),
      },
    });
  }

  function backspaceContent(key: string) {
    if (key === 'Backspace' && tweetCharacterCount === 50) {
      actions.setContent({
        content: tweetSomethingFormData.content.slice(0, -1),
      });
    }
  }

  function clearContent() {
    actions.setContent({
      content: '',
      errors: {
        content: '',
      },
    });
  }

  function setReplyPermissions(value: ReplyPermissions) {
    actions.setReplyPermissions(value);
  }

  return {
    tweetSomethingFormData,
    setContent,
    clearContent,
    setReplyPermissions,
    backspaceContent,
  };
}

function tweetSomethingReducer(state: {
  content: string;
  replyPermissions: ReplyPermissions;
  errors: { content: string };
}) {
  return {
    setReplyPermissions(replyPermissions: ReplyPermissions) {
      return { ...state, replyPermissions };
    },

    setContent({ content, errors }: SetContentArgs) {
      return {
        ...state,
        content,
        errors: {
          ...state.errors,
          ...errors,
        },
      };
    },
  };
}

function validateContent(content: string) {
  if (typeof content !== 'string' || content.length < 3) {
    return `Content must be at least 3 characters long`;
  }
  if (content.length > 50) {
    return `Content must be less than 50 characters long`;
  }
}
