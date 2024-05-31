
import Image from 'next/image';
import resim from '../../public/media/blog.png'
import Link from 'next/link';

const BenKimimHeader = ({ headerColor }) => {
    return (
        <header className="  w-full h-[128px] lg:h-[234px] flex flex-row bg-[#F1D6FF] p-[24px] md:p-[32px] lg:p-[64px]">
        <div className="w-full h-full flex justify-center items-center justify-between gap-[16px] lg:gap-[64px]">
            <div id="header-left" className=" order-2 lg:order-1  flex flex-col lg:flex-row  items-left justify-between lg:items-center gap-[16px] lg:gap-[32px] flex-grow lg:flex-grow-0">
            <Link className=''  href={{ pathname: '/'}}><h1 className=" site-big-title font-melodrama-medium text-[6vw] leading-[6vw] lg:text-[5vw] lg:leading-[5vw] whitespace-nowrap">Blogger</h1></Link>
                
            </div>
            <div id="header-medium" className='order-3 lg:order-2  flex flex-row  justify-end sm:items-end lg:flex-grow gap-[12px] md:gap-[32px] lg:gap-[32px]'>
                <a href="#" target='blank' rel="noopener noreferrer">
                    <svg className='Linkedin-logo logolar' xmlns="http://www.w3.org/2000/svg" width="31.53" height="31.528" viewBox="0 0 31.53 31.528">
                        <path id="linkedin" d="M139.184.063A15.764,15.764,0,1,0,154.95,15.827,15.765,15.765,0,0,0,139.184.063m-4.58,23.83h-3.84V12.343h3.84Zm-1.92-13.128h-.026a2.193,2.193,0,1,1,.026,0m15.764,13.128H144.61V17.714c0-1.553-.558-2.611-1.945-2.611a2.1,2.1,0,0,0-1.971,1.4,2.625,2.625,0,0,0-.126.937v6.451h-3.84s.051-10.468,0-11.551h3.84v1.635a3.81,3.81,0,0,1,3.461-1.905c2.525,0,4.42,1.65,4.42,5.2Z" transform="translate(-123.42 -0.063)" />
                    </svg>
                </a>

                <a href="#" target='blank' rel="noopener noreferrer">
                    <svg className='Instagram-logo logolar' xmlns="http://www.w3.org/2000/svg" width="32.7" height="31.528" viewBox="0 0 32.7 31.528">
                        <path id="instagram" d="M310.95.373H301.1a11.232,11.232,0,0,0-11.424,11.012v9.5A11.231,11.231,0,0,0,301.1,31.894h9.85a11.232,11.232,0,0,0,11.426-11.012v-9.5A11.07,11.07,0,0,0,311.254.367c-.1,0-.2,0-.3.006m2.1,15.824A7.1,7.1,0,1,1,305.7,9.368c.089,0,.174-.006.261-.006a6.94,6.94,0,0,1,7.093,6.785Zm2.1-6.834a1.759,1.759,0,1,1,.081,0c-.028,0-.055,0-.081,0" transform="translate(-289.676 -0.367)" />
                    </svg>
                </a>

                <a href="#" target='blank' rel="noopener noreferrer">
                    <svg className='Github-logo logolar' xmlns="http://www.w3.org/2000/svg" width="29.437" height="31.528" viewBox="0 0 29.437 31.528">
                        <defs>
                            <clipPath id="clipPath">
                                <rect id="Rectangle_118" data-name="Rectangle 118" width="29.437" height="31.528" fill="none" />
                            </clipPath>
                        </defs>
                        <g id="Github" transform="translate(0 0)">
                            <g id="Group_416" data-name="Group 416" transform="translate(0 0.001)" clipPath="url(#clipPath)">
                                <path id="Path_3075" data-name="Path 3075" d="M20.535,31.529a1.369,1.369,0,0,1-1.37-1.37v-5.3c0-.036,0-.072,0-.107a3.247,3.247,0,0,0-.905-2.513,1.369,1.369,0,0,1,.832-2.314c3.948-.439,7.6-1.74,7.6-8.221a6.048,6.048,0,0,0-1.675-4.192,1.371,1.371,0,0,1-.292-1.422,5.546,5.546,0,0,0,.189-3.271A11.057,11.057,0,0,0,21.3,4.572a1.368,1.368,0,0,1-1.12.184,16.974,16.974,0,0,0-8.867,0,1.358,1.358,0,0,1-1.12-.184A11.112,11.112,0,0,0,6.566,2.819a5.553,5.553,0,0,0,.193,3.273,1.371,1.371,0,0,1-.291,1.423,6.049,6.049,0,0,0-1.677,4.222c0,6.4,3.663,7.74,7.62,8.23a1.37,1.37,0,0,1,.815,2.312,3.247,3.247,0,0,0-.905,2.483l0,5.4a1.369,1.369,0,1,1-2.738,0V27.766c-4.138.627-5.882-1.59-7.086-3.117-.532-.676-.992-1.259-1.462-1.377A1.369,1.369,0,0,1,1.7,20.615a5.635,5.635,0,0,1,2.949,2.339c1.146,1.454,2.075,2.631,4.936,2.034v-.131a5.727,5.727,0,0,1,.407-2.529c-3.86-.878-7.94-3.242-7.94-10.585A8.761,8.761,0,0,1,3.941,6.253,8.274,8.274,0,0,1,4.34.87,1.372,1.372,0,0,1,5.21.1C5.71-.05,7.575-.331,11.2,1.961a19.718,19.718,0,0,1,9.094,0C23.912-.331,25.775-.051,26.276.1a1.368,1.368,0,0,1,.869.773,8.268,8.268,0,0,1,.4,5.38A8.775,8.775,0,0,1,29.438,11.7c0,7.769-4.724,9.92-7.93,10.617a5.984,5.984,0,0,1,.4,2.587V30.16a1.369,1.369,0,0,1-1.37,1.37" transform="translate(0 -0.001)" fill="#040405" />
                            </g>
                        </g>
                    </svg>
                </a>

                <a href="#" target='blank' rel="noopener noreferrer">
                    <svg className='X-logo logolar' xmlns="http://www.w3.org/2000/svg" width="34.88" height="31.528" viewBox="0 0 34.88 31.528">
                        <path id="x" d="M6.246,3.033h3.18l19.13,25.294H25.593ZM27.47,0,18.656,10.075,11.036,0H0L13.187,17.244.688,31.528H6.04l9.646-11.022,8.43,11.022H34.88L21.133,13.355,32.819,0Z" />
                    </svg>
                </a>

            </div>
            <div id="header-right" className='order-1 lg:order-3'>
                <Image className='header-profile-photo rounded-[8px]  max-h-[64px] max-w-[64px] md:max-h-[96px] md:max-w-[96px] lg:max-h-[128px] lg:max-w-[128px]' src={resim} width={128} height={128} alt="Picture of the author"
                />
            </div>
        </div>

    </header>
    );
};

export default BenKimimHeader;
