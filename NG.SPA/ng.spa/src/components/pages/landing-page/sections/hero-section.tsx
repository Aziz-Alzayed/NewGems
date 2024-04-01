import { FC } from "react";

export const HeroSection: FC = () => {
    const heroContent = {
        welcomeMessage: "New Gems.",
        subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        iconBoxes: [
            {
                id: 1,
                icon: "bi-fullscreen",
                title: "Professional Design",
                delay: "100"
            },
            {
                id: 2,
                icon: "bi-headset",
                title: "24/7 Quick Support For All Clients",
                delay: "200"
            },
            {
                id: 3,
                icon: "bi-person-check",
                title: "Satisfaction Guranteed",
                delay: "500"
            }
        ]
    };

    return (
        <section id="hero" className="hero">
            <div className="container position-relative">
                <div className="row gy-5" data-aos="fade-in">
                    <div className="col-lg-12 order-lg-1 d-flex flex-column justify-content-center text-center caption">
                        <h2>Welcome to <span style={{ color: '#FFD700', fontFamily: 'parisienne' }}>{heroContent.welcomeMessage}</span></h2>
                        <p>{heroContent.subtitle}</p>
                    </div>
                </div>
            </div>
            <div className="icon-boxes position-relative">
                <div className="container position-relative">
                    <div className="row gy-4 mt-5">
                        {heroContent.iconBoxes.map(box => (
                            <div className="col-xl-4 col-md-4" data-aos="fade-up" data-aos-delay={box.delay} key={box.id}>
                                <div className="icon-box">
                                    <div className="icon"><i className={box.icon}></i></div>
                                    <h4 className="title"><a href="" className="stretched-link">{box.title}</a></h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}