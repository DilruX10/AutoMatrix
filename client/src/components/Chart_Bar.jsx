import React, { PureComponent } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  {
    name: 'Mon',
    reserved: 35,
    empty: 25
  },
  {
    name: 'Tue',
    reserved: 40,
    empty: 20
  },
  {
    name: 'Wen',
    reserved: 50,
    empty: 10
  },
  {
    name: 'Thu',
    reserved: 45,
    empty: 15
  },
  {
    name: 'Fri',
    reserved: 55,
    empty: 5
  }
];

export default function Chart_Bar() {
    return (
    <center>
        <p style={{"font-size": "30px"}}>Student Participation by Day</p>
        <br/>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="reserved" stackId="a" fill="#8884d8" />
          <Bar dataKey="empty" stackId="a" fill="#82ca9d" />
        </BarChart>
    </center>
    );
}
