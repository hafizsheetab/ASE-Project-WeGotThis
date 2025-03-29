import React from "react";
import {Box, Typography, Pagination, Grid2} from "@mui/material";
import OfferCard from "./OfferCard";

const mockOffers = [
  {
    id: "1",
    title: "Walking Cute Dog",
    description:
        "I need to find a reliable volunteer that can help me walk my dog. I will pay in tips. The dog is very sweet, loves people etc.",
    category: "Service Seeking",
    tags: ["Dog", "Outdoor", "Walking"],
    availability: "Mar 20th, 2025, 11h",
    price: "$0",
    imageUrl: "https://picsum.photos/100",
  },
  {
    id: "2",
    title: "Walking Cute Dog",
    description:
        "I need to find a reliable volunteer that can help me walk my dog. I will pay in tips. The dog is very sweet, loves people etc.",
    category: "Service Seeking",
    tags: ["Dog", "Pet Sitting"],
    availability: "Mar 20th, 2025, 11h",
    price: "$0",
    imageUrl: "https://picsum.photos/120",
  },
  {
    id: "3",
    title: "Walking Cute Dog",
    description:
        "I need to find a reliable volunteer that can help me walk my dog. I will pay in tips. The dog is very sweet, loves people etc.",
    category: "Service Seeking",
    tags: ["Outdoor", "Exercise"],
    availability: "Mar 20th, 2025, 11h",
    price: "$0",
    imageUrl: "https://picsum.photos/150",
  },
  {
    id: "4",
    title: "Walking Cute Dog",
    description:
        "I need to find a reliable volunteer that can help me walk my dog. I will pay in tips. The dog is very sweet, loves people etc.",
    category: "Service Seeking",
    tags: ["Dog", "Walking", "Tips"],
    availability: "Mar 20th, 2025, 11h",
    price: "$0",
    imageUrl: "https://picsum.photos/140",
  },
  {
    id: "5",
    title: "Walking Cute Dog",
    description:
        "I need to find a reliable volunteer that can help me walk my dog. I will pay in tips. The dog is very sweet, loves people etc.",
    category: "Service Seeking",
    tags: ["Dog", "Friendly"],
    availability: "Mar 20th, 2025, 11h",
    price: "$0",
    imageUrl: "https://picsum.photos/150",
  },
  {
    id: "6",
    title: "Walking Cute Dog",
    description:
        "I need to find a reliable volunteer that can help me walk my dog. I will pay in tips. The dog is very sweet, loves people etc.",
    category: "Service Seeking",
    tags: ["Dog", "Volunteer"],
    availability: "Mar 20th, 2025, 11h",
    price: "$0",
    imageUrl: "https://picsum.photos/180",
  },
  {
    id: "7",
    title: "Walking Cute Dog",
    description:
        "I need to find a reliable volunteer that can help me walk my dog. I will pay in tips. The dog is very sweet, loves people etc.",
    category: "Service Seeking",
    tags: ["Dog", "Outdoor"],
    availability: "Mar 20th, 2025, 11h",
    price: "$0",
    imageUrl: "https://picsum.photos/130",
  },
  {
    id: "8",
    title: "Walking Cute Dog",
    description:
        "I need to find a reliable volunteer that can help me walk my dog. I will pay in tips. The dog is very sweet, loves people etc.",
    category: "Service Seeking",
    tags: ["Dog", "Exercise", "Friendly"],
    availability: "Mar 20th, 2025, 11h",
    price: "$0",
    imageUrl: "https://picsum.photos/110",
  },
];

const OfferList = () => {
  const totalResults = 634;
  const currentPage = 1;
  const totalPages = 10;

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log("Go to page:", page);
    // TODO: fetch or update state with new page data
  };

  return (
      <Box sx={{maxWidth: "1200px", mx: "auto", px: 2, my: 4}}>
        <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              mb: 2,
            }}
        >
          <Typography variant="body2" color="text.secondary">
            {`${currentPage * mockOffers.length} of ${totalResults} results`}
          </Typography>

          <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              shape="rounded"
              siblingCount={1}
              boundaryCount={1}
              sx={{
                "& .MuiPaginationItem-root": {
                  border: "1px solid #ddd",
                },
                "& .Mui-selected": {
                  backgroundColor: "#fa921a",
                  color: "#fff",
                  borderColor: "#f97316",
                  "&:hover": {
                    backgroundColor: "#f97316",
                  },
                },
              }}
          />
        </Box>

        <Grid2 container spacing={3}>
          {mockOffers.map((offer, idx) => (
              <Grid2 size={{xs: 12, sm: 12, md: 6}} key={idx}>
                <OfferCard {...offer} />
              </Grid2>
          ))}
        </Grid2>
      </Box>
  );
};

export default OfferList;