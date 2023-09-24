import { ReactNode, useMemo, } from 'react';
import './styles.css';
import CartIcon from '../icons/cart';
import { Link, useNavigate } from 'react-router-dom';
import ArrowLeftIcon from '../icons/arrow-left';

const Layout = (props: {children?: ReactNode, titleHeader?: string, canBack?: boolean}) => {
    const {children, titleHeader, canBack = false} = props;
    const navigate = useNavigate();
    const header = useMemo(()=> [
        {
            label: 'Dashboard',
            route: '/',
        },
    ] ,[])
    return (
        <div>
            <div className='header-container'>
                <div className='header-left'>
                    <div className='header-title'>
                        Movie Catalog
                    </div>
                    <div className='header-list'>
                        {header.map((e, idx)=>
                            <Link key={idx} to={e.route}>
                                <div className='header'>{e.label}</div>
                            </Link>
                        )}
                    </div>
                </div>
                <Link to='/cart'>
                    <div className='icon-button'><CartIcon /></div>
                </Link>
            </div>
            <div className="title-container">
                <div className='back-button-container'>
                    {canBack && <div data-testid="back-button" className='back-button' onClick={() => navigate(-1)}><ArrowLeftIcon /></div>}
                </div>
                <h2>{titleHeader}</h2>
            </div>
            {children}
        </div>
    );
};

export default Layout;
