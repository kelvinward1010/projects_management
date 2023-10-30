"use client"
import { Typography } from 'antd';
import React from 'react'
import { AiOutlineFileAdd } from 'react-icons/ai'

const { Title } = Typography;

interface Props {
  title?: string | null;
  create?: () => void;
}

function HeaderInProject({
  title,
  create
}: Props) {
  return (
    <div
        className='
            h-16
            w-full
            flex
            justify-between
            p-5
            items-center
        '
    >
      <Title level={3}>{title}</Title>  
      <button
          className="
              w-52
              h-9
              bg-sky-700
              text-white
              flex
              items-center
              justify-center
              gap-2
              rounded-md
              shadow-lg
          "
          onClick={create}
      >
          <AiOutlineFileAdd />
          Create
      </button>
    </div>
  )
}

export default HeaderInProject