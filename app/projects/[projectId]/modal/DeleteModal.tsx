'use client';

import React, { useCallback, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { FiAlertTriangle } from 'react-icons/fi'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Modal from '@/app/components/modals/Modal';
import { toast } from 'react-hot-toast';
import Button from '@/app/components/buttons/Button';
import useIssues from '@/app/hooks/useIssues';

interface ConfirmModalProps {
    isOpen?: boolean;
    onClose: () => void;
    taskId?: string;
}

const DeleteModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    taskId
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {data: dataTask} = useIssues(taskId as string);
    const {mutate: mutateProject } = useIssues(dataTask?.projectId as string);

    const handleDelete = useCallback(() => {
        setIsLoading(true);

        axios.delete(`/api/tasks/${taskId}`)
            .then(() => {
                onClose();
                mutateProject();
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false)
                toast.success('Task has been deleted!')
            })
    },[router, taskId, onClose]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="sm:flex sm:items-start">
                <div
                    className="
                        mx-auto 
                        flex 
                        h-12 
                        w-12 
                        flex-shrink-0 
                        items-center 
                        justify-center 
                        rounded-full 
                        bg-red-100 
                        sm:mx-0 
                        sm:h-10 
                        sm:w-10
                    "
                >
                    <FiAlertTriangle
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                    />
                </div>
                <div
                    className="
                        mt-3 
                        text-center 
                        sm:ml-4 
                        sm:mt-0 
                        sm:text-left
                    "
                >
                    <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                    >
                        Delete Task
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Are you sure you want to delete this task? This action cannot be undone.
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <Button
                    disabled={isLoading}
                    danger
                    onClick={handleDelete}
                >
                    Delete
                </Button>
                <Button
                    disabled={isLoading}
                    secondary
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    )
}

export default DeleteModal;