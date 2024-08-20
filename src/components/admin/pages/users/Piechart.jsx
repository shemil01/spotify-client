import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GenderPieChart = ({users}) => {

  const genderCounts = users.reduce((acc,user)=>{
    if(user.gender === 'Male') acc.male += 1;
    else if(user.gender === 'Female') acc.female +=1;
    else acc.other += 1
    return acc
  },
  {male:0,female:0,other:0}
) 
  const data = {
    labels: ['Male', 'Female', 'Other'],
    datasets: [
      {
        label: 'Total',
        data: [genderCounts.male,genderCounts.female,genderCounts.other],
        backgroundColor: [
          '#130440', 
          '#f0058a', 
          '#eb8a0c',
        ],
        borderColor: [
          '#130440',
          '#f0058a',
          '#eb8a0c',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4  rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Gender Distribution</h2>
      <Pie data={data} />
    </div>
  );
};

export default GenderPieChart;
