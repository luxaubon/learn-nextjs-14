"use client"

import {useState,useEffect} from 'react'
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';

import Form from '@/components/Form'

const CreatePost = () => {

    const router = useRouter();
    const { data: session } = useSession();
    
    const [submitting , setIsSubmitting] = useState(false);
    const [post , setPost] = useState({ prompt: "", tag: "" });

    const createPrompt = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try{
          const response = await fetch("/api/prompt/new", {
            method: "POST",
            body: JSON.stringify({
              prompt: post.prompt,
              userId: session?.user.id,
              tag: post.tag,
            }),
          });
          if (response.ok) {
            router.push("/");
          }

        }catch(err){
            console.log(err)
        }finally{
            setIsSubmitting(false)
        }
    }

    
  return (
    <div>
      <Form 
        type = 'Create'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </div>
  )
}

export default CreatePost
