import React from 'react';
import {
  Button,
} from '@mui/material';
import { RestoreOutlined } from '@mui/icons-material';
import { NavLink, Routes, Route, Outlet } from 'react-router-dom';
import Payment from '../payment';
import useNavigation from '../../customHooks/useNav';

const StudentInfo = () => {
  const { subTabs } = useNavigation();

  return (
    <div className="bg-light p-3" style={{ height: 'calc(100vh - 33vh)' }}>
      {/* Top Section */}
      <div className="payment_top d-flex flex-row justify-content-between mt-2 mb-3">
        <div className="Payments_left d-flex flex-row gap-1">
          <div className="img-dollar">
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d)">
                <rect x="3" y="3" width="42" height="42" rx="7" fill="#3425FF" />
                <path
                  d="M18.7803 20.9261C18.7803 20.36 19.2392 19.901 19.8054 19.901H25.7626C25.6858 19.491 25.5562 19.12 25.3739 18.788C25.2011 18.4463 24.9516 18.1583 24.6252 17.924C24.3085 17.6799 23.9102 17.4945 23.4303 17.3675C22.96 17.2309 22.3986 17.1625 21.7459 17.1625H19.8054C19.2392 17.1625 18.7803 16.7036 18.7803 16.1374C18.7803 15.5713 19.2392 15.1123 19.8054 15.1123H30.7552C31.3213 15.1123 31.7803 15.5713 31.7803 16.1374C31.7803 16.7036 31.3213 17.1625 30.7552 17.1625H27.0582C27.3366 17.5237 27.5621 17.9338 27.7349 18.3926C27.9172 18.8417 28.0372 19.3445 28.0948 19.901H30.7552C31.3213 19.901 31.7803 20.36 31.7803 20.9261C31.7803 21.4923 31.3213 21.9512 30.7552 21.9512H28.0228C27.8212 23.1228 27.3462 24.1235 26.5975 24.9533C25.8585 25.7734 24.918 26.3396 23.7758 26.6521V26.7106C24.1022 26.8668 24.3997 27.0475 24.6684 27.2525C24.9372 27.4575 25.1963 27.6967 25.4458 27.97C25.6954 28.2336 25.9401 28.5412 26.1801 28.8926C26.4296 29.2441 26.6935 29.6444 26.9719 30.0935L29.5651 34.3452C30.0374 35.1195 29.4801 36.1123 28.5731 36.1123C28.1609 36.1123 27.7795 35.8939 27.5709 35.5384L24.6252 30.5182C24.3085 29.9812 24.0062 29.5077 23.7183 29.0977C23.4399 28.6876 23.1376 28.3459 22.8113 28.0726C22.4946 27.7992 22.1394 27.5942 21.7459 27.4575C21.362 27.3208 20.9109 27.2525 20.3927 27.2525H19.7834C19.2294 27.2525 18.7803 26.8034 18.7803 26.2493C18.7803 25.6953 19.2294 25.2462 19.7834 25.2462H21.7315C22.221 25.2462 22.6865 25.1681 23.128 25.0119C23.5695 24.8459 23.963 24.6214 24.3085 24.3382C24.6636 24.0454 24.9612 23.6988 25.2011 23.2985C25.4506 22.8885 25.6282 22.4394 25.7338 21.9512H19.8054C19.2392 21.9512 18.7803 21.4923 18.7803 20.9261Z"
                  fill="white"
                />
              </g>
              <defs>
                <filter id="filter0_d" x="0.95122" y="0.95122" width="46.0976" height="46.0976" filterUnits="userSpaceOnUse">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                  <feOffset />
                  <feGaussianBlur stdDeviation="1.02439" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                </filter>
              </defs>
            </svg>
          </div>
          <div>
            <h5 style={{ margin: 0 }}>Payments</h5>
            <p style={{ margin: 0, fontSize: '12px' }}>
              Get all student details regarding fee payment, transport, and more...
            </p>
          </div>
        </div>
        <div className="payments_right">
          <Button
            variant="outlined"
            color="inherit"
            endIcon={<RestoreOutlined />}
            size="small"
            onClick={() => alert('Add Item')}
          >
            History
          </Button>
        </div>
      </div>

      {/* Tabs */}
     <div className="tabs">
        {subTabs.map((tab, index) => (
          <NavLink key={index} to={tab.path} end>
            {tab.name}
          </NavLink>
        ))}
      </div>
      <div className="sub-tab-content">
       <Outlet/>
      </div>
    </div>
  );
};

export default StudentInfo;