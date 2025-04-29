'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/trpc/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type FormInput = {
    repoUrl : string
    repoName : string
    gitHubToken?: string
}
const CreatePage = () => {
    const { register, handleSubmit, reset} = useForm<FormInput>()
    const createProject = api.project.createProject.useMutation()

    function onSubmit(data: FormInput){
      
        createProject.mutate({
            githubUrl : data.repoUrl,
            name : data.repoName,
            githubToken : data.gitHubToken ?? ''
        },  {
            onSuccess: () => {
                toast.success('Project Created Successfully')
                reset()
            },
            onError: () => {
                
                toast.error('Something Went Wrong')
            }
        })
        return true;
    }
  return (
    <div className='flex items-center gap-2 h-full justify-center'>
  <img src= '/' alt='github' className='h-56 w-auto' />
    <div>
        <div>
            <h1 className='text-2xl font-bold'>
                Link Your GitHub Repository
            </h1>
            <p className='text-sm text-muted-foreground'>
                Enter the URL of Your GitHub Repository
            </p>
        </div>
        <div className='h-4'></div>
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                <Input 
                 {...register('repoName', {required: true})}
                 placeholder='ProjectName*'
                 required 
                />
            
                <Input 
                 {...register('repoUrl', {required: true})}
                 placeholder='Your GitHub Repository URL*'
                 type='url'
                 required 
                />
                <Input
                 {...register('gitHubToken')}
                 placeholder='GitHub Token  (Optional)'
                />
            
                <Button type='submit' disabled={createProject.isPending}>Submit</Button>
            </form>
        </div>
    </div>
    </div>
  )
}

export default CreatePage
