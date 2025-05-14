'use client';

import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface AnimatedStatProps {
  end: number;
  prefix?: string;
  label: string;
}

export function AnimatedStat({ end, prefix = '', label }: AnimatedStatProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="text-center">
      <p className="text-6xl font-bold text-tertiary">
        <strong>
        <span className="text-tertiary">+</span>
          {prefix}
          {inView ? (
            <CountUp
              end={end}
              duration={2.5}
              separator=" "
              enableScrollSpy
              scrollSpyOnce
              className='text-tertiary'
            />
          ) : '0'}
        </strong>
      </p>
      <p className="text-base sm:text-lg mt-2">{label}</p>
    </div>
  );
}
