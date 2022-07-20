import styles from './index.module.css';
import { ThumbsUp, Trash } from "phosphor-react";
import { Avatar } from '../Avatar';
import { useState } from 'react';

interface CommentsProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment } : CommentsProps){

  const [likeCount,setLikeCount] = useState(0);

  function handleDeleteComment(){
    onDeleteComment(content);
  }

  function handleLikeComment(){
    setLikeCount(likeCount + 1);
  }

  return (
    <div className={styles.comment}>
      <Avatar 
        src="https://github.com/oseasmoreto.png" 
        alt="Oséas Moreto" 
        hasBorder={false}
      />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Oséas Moreto</strong>
              <time title="19 de Julho às 10h20" dateTime="2022-07-19 10:20:22">Publicado há 1h</time>
            </div>

            <button onClick={() => handleDeleteComment()} title="Deletar comentário">
              <Trash size="24" />
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={() => handleLikeComment()}>
            <ThumbsUp size="20" />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}