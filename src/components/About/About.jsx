import React from 'react';
import avatarJpeg from '../../images/avatar.jpg';
import avatarWebp from '../../images/avatar.webp';

const About = () => (
  <section className="about">
    <picture className="about__avatar-wrapper">
      <source srcSet={avatarJpeg} />
      <source srcSet={avatarWebp} />
      <img className="about__avatar" src={avatarJpeg} alt="avatar" />
    </picture>
    <div className="about__text-wrapper">
      <h2 className="about__title">Об авторе</h2>
      <p className="about__description">
        Это блок с описанием автора проекта.
        Здесь следует указать, как вас зовут, чем вы занимаетесь,
        какими технологиями разработки владеете.
      </p>
      <p className="about__description">
        Также можно рассказать о процессе обучения в Практикуме,
        чему вы тут научились, и чем можете помочь потенциальным заказчикам
      </p>
    </div>
  </section>
);

export default About;
