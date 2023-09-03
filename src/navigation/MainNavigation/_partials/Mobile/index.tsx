import { MotionBox, MotionText } from "@/components/Motion";
import { useThemeVars } from "@/hooks/useThemeVars";
import { Box, Button, Link, Stack } from "@mui/material";
import { useState } from "react";
import { Link as RRLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";

const Mobile = ({ links }: { links: any[] }) => {
  const { colors } = useThemeVars();
  const [navIsOpen, setNavIsOpen] = useState(false);
  return (
    <>
      <Button
        variant={"text"}
        onClick={() => setNavIsOpen(true)}
        sx={{
          display: { xs: "flex", md: "none" },
          padding: 0,
          minWidth: "auto",
          maxWidth: "32px",
        }}
        size="large"
      >
        <MenuIcon sx={{ fontSize: "34px" }} />
      </Button>
      <AnimatePresence mode="wait">
        {navIsOpen && (
          <MotionBox
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              background: `linear-gradient(rgb(255 255 255 / 30%), ${colors.mutedWhite})`,
              zIndex: 100,
              width: "100%",
              height: "100vh",
              minHeight: "-webkit-fill-available", // fixes "height: 100vh" not working on mobile
              webKitFillAvailable: true,
              overflow: "hidden",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              backdropFilter: "blur(11.6px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            exit={{ opacity: 0 }}
          >
            <Stack
              component="nav"
              direction="column"
              spacing={4}
              sx={{ display: { xs: "flex", md: "none" }, pb: 8, px: 4 }}
            >
              {links.map(
                (link: { pathname: string; href: string; label: string }) => {
                  const match = location.pathname === link.href;
                  return (
                    <Link
                      component={RRLink}
                      onClick={() => setNavIsOpen(false)}
                      to={link.href}
                      key={link.href}
                      sx={{
                        textDecoration: "none",
                        textTransform: "uppercase",
                        letterSpacing: "2px",

                        transition: "color 0.2s ease-in-out",
                        "&:hover": {
                          color: colors.nav.linkHoverColor,
                        },
                      }}
                    >
                      <Box mb={"2px"} pl={"2px"} textAlign={"right"}>
                        <MotionText
                          sx={{ fontWeight: "600" }}
                          initial={{
                            fontWeight: "600",
                            color: colors.nav.linkColor,
                          }}
                          animate={{
                            color: match
                              ? colors.nav.linkActiveColor
                              : colors.nav.linkColor,
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          {link.label}
                        </MotionText>
                      </Box>

                      {match && (
                        <MotionBox
                          sx={{
                            height: "4px",
                            width: "20px",
                            background: colors.secondary,
                            borderRadius: "4px",
                            ml: "auto",
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: "20px" }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </Link>
                  );
                }
              )}
              <Button variant="outlined" onClick={() => setNavIsOpen(false)}>
                <CloseIcon />
                Close
              </Button>
            </Stack>
          </MotionBox>
        )}
      </AnimatePresence>
    </>
  );
};
export default Mobile;
