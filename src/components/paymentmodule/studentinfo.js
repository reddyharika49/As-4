import React, { useRef } from 'react';
import {
  Button,
  IconButton
} from '@mui/material';
import { RestoreOutlined, ChevronRight } from '@mui/icons-material';
import { NavLink, Outlet } from 'react-router-dom';
import useNavigation from '../../customHooks/useNav';

const StudentInfo = () => {
  const { subTabs } = useNavigation();
  const tabContainerRef = useRef(null);

  const scrollRight = () => {
    if (tabContainerRef.current) {
      tabContainerRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-light p-3" style={{ height: 'calc(100vh - 33vh)' }}>
      {/* Top Section */}
      <div className="payment_top d-flex flex-row justify-content-between mt-2 mb-3">
        <div className="Payments_left d-flex flex-row gap-1">
          <div className="img-dollar">
            {/* Your SVG remains unchanged */}
            {/* ... */}
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
      <div className='card'>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 ,flexDirection:"row"}}>
        <div
          ref={tabContainerRef}
          className="tabs-scroll"
          style={{
            display: 'flex-direction-row',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            width: '70%',
            whiteSpace: 'nowrap',
            borderBottom:"1px solid #dcdcdc",
             paddingTop:"5px",
             paddingLeft:"30px",
            scrollbarWidth: 'none' // Firefox
          }}
        >
          {subTabs.map((tab, index) => (
            <NavLink
              key={index}
              to={tab.path}
              end
              style={({ isActive }) => ({
                color: isActive ? '#1E1EFF' : '#888',
                fontWeight: isActive ? '600' : '400',
                textDecoration: 'none',
                padding: '8px 12px',
               
                display: 'inline-block',
                position: 'relative',
                fontSize: '14px',
                minWidth: 'fit-content'
              })}
            >
              {({ isActive }) => (
                <>
                  {tab.name}
                  {isActive && (
                    <div
                      style={{
                        height: '2px',
                        backgroundColor: '#1E1EFF',
                        width: '100%',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        borderRadius: 4,
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>
            
          ))}
         
        </div>
         <div>
              <IconButton
          onClick={scrollRight}
          size="small"
          sx={{
            color: 'black',
            padding:"0px", 
            height: 50,
            width: 50
          }}
        >
          <ChevronRight />
        </IconButton>
          </div>






        {/* Right Scroll Button */}
      
          
      </div>
        <div className="sub-tab-content mt-3  ">
            <Outlet />
          </div>

          </div>
     {/* <div><hr style={{marginTop:"0px"}}></hr></div> */}

      {/* Content */}
      
    </div>
  );
};

export default StudentInfo;
