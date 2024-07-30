import React, { FC } from 'react';
import Nv from '@/utils/nv';

type CharInfo = {
  pinyin: string;
  desc: string;
  collection: string[];
}

type CharInfoProps = {
  char: string;
};

const CharInfo: FC<CharInfoProps> = ({ char }) => {
  if (!char) return null;
  // @ts-ignore
  const charInfo = (Nv[char] || Nv["U5A2A"]) as CharInfo;

  return (
    <div className="char-info fixed top-10 right-16 p-4 w-80 bg-white shadow-lg text-black">
      <h2 className='text-4xl mb-3'>{ char }
        <span> { charInfo.pinyin } </span>
      </h2>
      <p>{ charInfo.desc }</p>
      { charInfo.collection.length > 0 && (
        <div className='mt-5'>
          <h3 className='text-2xl mb-2'>组词</h3>
          <ul>
            { charInfo.collection.map((item) => (
              <li key={ item }>{ item }</li>
            )) }
          </ul>
        </div>
      ) }
    </div>
  );
}

export default CharInfo;
