import { Box, Container } from "@mui/material";
import Carousel from "components/carousel/Carousel";
import { CarouselCard1 } from "components/carousel-cards";
// ======================================================

const Section1 = ({ carouselData }) => {
  return (
    <Box bgcolor="white" mb={7.5}>
      <Container
        sx={{
          py: 4,
        }}
      >
        <Carousel
          spacing="0px"
          totalSlides={5}
          infinite={true}
          showDots={true}
          autoPlay={true}
          visibleSlides={1}
          showArrow={false}
        >
          {carouselData.map((data, ind) => (
            <CarouselCard1 {...data} key={ind} />
          ))}
        </Carousel>
      </Container>
    </Box>
  );
};
export default Section1;
