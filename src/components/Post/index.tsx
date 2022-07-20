import { Avatar } from '../Avatar';
import { Comment } from '../Comment';
import styles from './index.module.css';

import {format, formatDistanceToNow} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface Author {
  name:string;
  role:string;
  avatarUrl:string;
}

interface Content {
  type: string;
  content: string;
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[]
}

export function Post({author,publishedAt,content} : PostProps){

  const [comments, setComments] = useState([
    "Post topissímo!"
  ]);

  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(publishedAt,"dd 'de' LLLL 'às' HH:mm'h' ",{
    locale:ptBR
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt,{
    locale:ptBR,
    addSuffix:true
  });

  function handleCreateNewComment(event: FormEvent){
    event.preventDefault();

    //event.target.comment.value recupera o valor do textarea
    setComments([...comments,newCommentText]);
    setNewCommentText('');
  }

  function handleNewTextComment(event: ChangeEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('Este campo é obrigatório');
  }

  function deleteComment(commentToDelete: string){
    const commentsWithoutDeletedOn = comments.filter(comment => {
      return comment !== commentToDelete;
    });

    setComments(commentsWithoutDeletedOn);
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar 
            src={author.avatarUrl}
            alt={author.name}
          />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
      </header>
      <div className={styles.content}>
        { content.map((line,index) => {
          if(line.type === 'paragraph'){
            return <p key={index}>{line.content}</p>
          }else if(line.type === 'link'){
            return <p key={index}><a href="#">{line.content}</a></p>
          }
        }) }
      </div>

      <form onSubmit={handleCreateNewComment} method="post" className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea 
          name="comment" 
          onChange={handleNewTextComment} 
          value={newCommentText} 
          placeholder="Deixe um comentário"
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button disabled={isNewCommentEmpty} type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        { comments.map(comment => {
          return (
            <Comment 
              key={comment} 
              content={comment} 
              onDeleteComment={deleteComment}
            />
          )
        })}
        
      </div>
    </article>
  )
}