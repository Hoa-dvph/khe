import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaPinterest,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import { Box, Container, Grid, Link, Typography, Divider } from "@mui/material";
import VectorLogo from "../../assets/images/Vector.svg";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ backgroundColor: "black", color: "white", py: 8 }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
        >
          {/* Logo Section */}
          <Grid item xs={12} sm={6} md={2}>
            <Box sx={{ mb: 2 }}>
              <img
                src={VectorLogo}
                alt="VNxLabs Logo"
                style={{
                  width: "128px",
                  height: "auto",
                  filter: "brightness(0) invert(1)",
                }}
              />
            </Box>
          </Grid>

          {/* Built For Creatives Section */}
          <Grid item xs={12} sm={6} md={3}>
            {" "}
            {/* Increased width for this section */}
            <Typography variant="h6" gutterBottom noWrap>
              {" "}
              {/* Added noWrap to prevent text wrapping */}
              Built For Creatives
            </Typography>
            <Box>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                sx={{ fontSize: "0.875rem", mb: 1 }}
              >
                Try Behance Pro
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                sx={{ fontSize: "0.875rem", mb: 1 }}
              >
                Find Inspiration
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                sx={{ fontSize: "0.875rem", mb: 1 }}
              >
                Get Hired
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                sx={{ fontSize: "0.875rem", mb: 1 }}
              >
                Sell Creative Assets
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                sx={{ fontSize: "0.875rem", mb: 1 }}
              >
                Sell Freelance Services
              </Link>
            </Box>
          </Grid>

          {/* Find Talent Section */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Find Talent
            </Typography>
            <Box>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                sx={{ fontSize: "0.875rem", mb: 1 }}
              >
                Post a Job
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                sx={{ fontSize: "0.875rem", mb: 1 }}
              >
                Graphic Designers
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                sx={{ fontSize: "0.875rem", mb: 1 }}
              >
                Photographers
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                sx={{ fontSize: "0.875rem", mb: 1 }}
              >
                Video Editors
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                sx={{ fontSize: "0.875rem", mb: 1 }}
              >
                Web Designers
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                sx={{ fontSize: "0.875rem", mb: 1 }}
              >
                Illustrators
              </Link>
            </Box>
          </Grid>

          {/* Behance Section */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Behance
            </Typography>
            <Box>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                sx={{ fontSize: "0.875rem", mb: 1 }}
              >
                About Behance
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                sx={{ fontSize: "0.875rem", mb: 1 }}
              >
                Adobe Portfolio
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                sx={{ fontSize: "0.875rem", mb: 1 }}
              >
                Download the App
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                sx={{ fontSize: "0.875rem", mb: 1 }}
              >
                Blog
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                sx={{ fontSize: "0.875rem", mb: 1 }}
              >
                Careers
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                sx={{ fontSize: "0.875rem", mb: 1 }}
              >
                Help Center
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                sx={{ fontSize: "0.875rem", mb: 1 }}
              >
                Contact Us
              </Link>
            </Box>
          </Grid>

          {/* Social Section */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Social
            </Typography>
            <Box>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="flex"
                alignItems="center"
                sx={{ fontSize: "0.875rem", mb: 1 }}
              >
                <FaInstagram style={{ marginRight: "8px" }} /> Instagram
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="flex"
                alignItems="center"
                sx={{ fontSize: "0.875rem", mb: 1 }}
              >
                <FaTwitter style={{ marginRight: "8px" }} /> Twitter
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="flex"
                alignItems="center"
                sx={{ fontSize: "0.875rem", mb: 1 }}
              >
                <FaPinterest style={{ marginRight: "8px" }} /> Pinterest
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="flex"
                alignItems="center"
                sx={{ fontSize: "0.875rem", mb: 1 }}
              >
                <FaFacebook style={{ marginRight: "8px" }} /> Facebook
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="flex"
                alignItems="center"
                sx={{ fontSize: "0.875rem", mb: 1 }}
              >
                <FaLinkedin style={{ marginRight: "8px" }} /> LinkedIn
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ borderColor: "gray.700", my: 4 }} />

        {/* Footer Bottom Section */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography variant="body2" color="gray.500">
            © 2024 Adobe Inc. All rights reserved.
          </Typography>
          <Box display="flex" alignItems="center" sx={{ mt: { xs: 2, md: 0 } }}>
            <Link href="#" color="inherit" underline="hover" sx={{ ml: 2 }}>
              English
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              display="block"
              sx={{ mx: 2 }}
            >
              |
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ ml: 2 }}>
              TOU
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ ml: 2 }}>
              Privacy
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ ml: 2 }}>
              Community
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ ml: 2 }}>
              Cookie preferences
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ ml: 2 }}>
              Do not sell or share my personal information
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
